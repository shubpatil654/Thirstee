from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
from email_validator import validate_email, EmailNotValidError

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'thirstee-secret-key-2024')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///thirstee.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-string')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app, origins=["http://localhost:3000", "https://your-domain.com"])

# Configure Cloudinary for image uploads
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# Database Models
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, default=0)
    category = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(500))
    features = db.Column(db.JSON)
    status = db.Column(db.String(20), default='active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class GalleryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(500), nullable=False)
    tags = db.Column(db.JSON)
    status = db.Column(db.String(20), default='published')
    upload_date = db.Column(db.DateTime, default=datetime.utcnow)

class JoinRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    company = db.Column(db.String(200))
    position = db.Column(db.String(100))
    message = db.Column(db.Text, nullable=False)
    service = db.Column(db.String(100))
    status = db.Column(db.String(20), default='pending')
    submitted_date = db.Column(db.DateTime, default=datetime.utcnow)
    reviewed_date = db.Column(db.DateTime)
    reviewed_by = db.Column(db.String(100))
    notes = db.Column(db.Text)

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    service = db.Column(db.String(100))
    message = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default='unread')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class SiteSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.Text)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Sponsor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(50), default='sponsor')
    status = db.Column(db.String(20), default='active')
    total_orders = db.Column(db.Integer, default=0)
    total_spent = db.Column(db.Float, default=0.0)
    join_date = db.Column(db.DateTime, default=datetime.utcnow)
    last_active = db.Column(db.DateTime, default=datetime.utcnow)

# Authentication Routes
@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({'error': 'Username and password required'}), 400

        admin = Admin.query.filter_by(username=username).first()
        
        if admin and admin.check_password(password):
            access_token = create_access_token(identity=admin.id)
            return jsonify({
                'access_token': access_token,
                'admin': {
                    'id': admin.id,
                    'username': admin.username,
                    'email': admin.email
                }
            }), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/verify', methods=['GET'])
@jwt_required()
def verify_token():
    try:
        current_admin_id = get_jwt_identity()
        admin = Admin.query.get(current_admin_id)
        
        if admin:
            return jsonify({
                'admin': {
                    'id': admin.id,
                    'username': admin.username,
                    'email': admin.email
                }
            }), 200
        else:
            return jsonify({'error': 'Admin not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Product Routes
@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        products = Product.query.all()
        return jsonify([{
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'stock': p.stock,
            'category': p.category,
            'image_url': p.image_url,
            'features': p.features or [],
            'status': p.status,
            'created_at': p.created_at.isoformat(),
            'updated_at': p.updated_at.isoformat()
        } for p in products]), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products', methods=['POST'])
@jwt_required()
def create_product():
    try:
        data = request.get_json()
        
        product = Product(
            name=data['name'],
            description=data.get('description', ''),
            price=float(data['price']),
            stock=int(data.get('stock', 0)),
            category=data['category'],
            image_url=data.get('image_url', ''),
            features=data.get('features', []),
            status=data.get('status', 'active')
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify({
            'id': product.id,
            'message': 'Product created successfully'
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        data = request.get_json()
        
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = float(data.get('price', product.price))
        product.stock = int(data.get('stock', product.stock))
        product.category = data.get('category', product.category)
        product.image_url = data.get('image_url', product.image_url)
        product.features = data.get('features', product.features)
        product.status = data.get('status', product.status)
        
        db.session.commit()
        
        return jsonify({'message': 'Product updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    try:
        product = Product.query.get_or_404(product_id)
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({'message': 'Product deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Gallery Routes
@app.route('/api/gallery', methods=['GET'])
def get_gallery():
    try:
        items = GalleryItem.query.all()
        return jsonify([{
            'id': item.id,
            'title': item.title,
            'description': item.description,
            'category': item.category,
            'image_url': item.image_url,
            'tags': item.tags or [],
            'status': item.status,
            'upload_date': item.upload_date.isoformat()
        } for item in items]), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/gallery', methods=['POST'])
@jwt_required()
def create_gallery_item():
    try:
        data = request.get_json()
        
        item = GalleryItem(
            title=data['title'],
            description=data.get('description', ''),
            category=data['category'],
            image_url=data['image_url'],
            tags=data.get('tags', []),
            status=data.get('status', 'published')
        )
        
        db.session.add(item)
        db.session.commit()
        
        return jsonify({
            'id': item.id,
            'message': 'Gallery item created successfully'
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/gallery/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_gallery_item(item_id):
    try:
        item = GalleryItem.query.get_or_404(item_id)
        data = request.get_json()
        
        item.title = data.get('title', item.title)
        item.description = data.get('description', item.description)
        item.category = data.get('category', item.category)
        item.image_url = data.get('image_url', item.image_url)
        item.tags = data.get('tags', item.tags)
        item.status = data.get('status', item.status)
        
        db.session.commit()
        
        return jsonify({'message': 'Gallery item updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/gallery/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_gallery_item(item_id):
    try:
        item = GalleryItem.query.get_or_404(item_id)
        db.session.delete(item)
        db.session.commit()
        
        return jsonify({'message': 'Gallery item deleted successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Join Request Routes
@app.route('/api/join-requests', methods=['GET'])
@jwt_required()
def get_join_requests():
    try:
        requests = JoinRequest.query.order_by(JoinRequest.submitted_date.desc()).all()
        return jsonify([{
            'id': req.id,
            'name': req.name,
            'email': req.email,
            'phone': req.phone,
            'company': req.company,
            'position': req.position,
            'message': req.message,
            'service': req.service,
            'status': req.status,
            'submitted_date': req.submitted_date.isoformat(),
            'reviewed_date': req.reviewed_date.isoformat() if req.reviewed_date else None,
            'reviewed_by': req.reviewed_by,
            'notes': req.notes
        } for req in requests]), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/join-requests', methods=['POST'])
def create_join_request():
    try:
        data = request.get_json()
        
        # Validate email
        try:
            validate_email(data['email'])
        except EmailNotValidError:
            return jsonify({'error': 'Invalid email address'}), 400
        
        join_request = JoinRequest(
            name=data['name'],
            email=data['email'],
            phone=data.get('phone', ''),
            company=data.get('company', ''),
            position=data.get('position', ''),
            message=data['message'],
            service=data.get('service', '')
        )
        
        db.session.add(join_request)
        db.session.commit()
        
        return jsonify({
            'id': join_request.id,
            'message': 'Join request submitted successfully'
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/join-requests/<int:request_id>/status', methods=['PUT'])
@jwt_required()
def update_request_status(request_id):
    try:
        join_request = JoinRequest.query.get_or_404(request_id)
        data = request.get_json()
        
        current_admin_id = get_jwt_identity()
        admin = Admin.query.get(current_admin_id)
        
        join_request.status = data['status']
        join_request.reviewed_date = datetime.utcnow()
        join_request.reviewed_by = admin.username
        join_request.notes = data.get('notes', '')
        
        db.session.commit()
        
        return jsonify({'message': 'Request status updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Contact Message Routes
@app.route('/api/contact', methods=['POST'])
def create_contact_message():
    try:
        data = request.get_json()
        
        # Validate email
        try:
            validate_email(data['email'])
        except EmailNotValidError:
            return jsonify({'error': 'Invalid email address'}), 400
        
        message = ContactMessage(
            name=data['name'],
            email=data['email'],
            company=data.get('company', ''),
            phone=data.get('phone', ''),
            service=data.get('service', ''),
            message=data['message']
        )
        
        db.session.add(message)
        db.session.commit()
        
        return jsonify({
            'id': message.id,
            'message': 'Message sent successfully'
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/contact', methods=['GET'])
@jwt_required()
def get_contact_messages():
    try:
        messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
        return jsonify([{
            'id': msg.id,
            'name': msg.name,
            'email': msg.email,
            'company': msg.company,
            'phone': msg.phone,
            'service': msg.service,
            'message': msg.message,
            'status': msg.status,
            'created_at': msg.created_at.isoformat()
        } for msg in messages]), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Image Upload Route
@app.route('/api/upload', methods=['POST'])
@jwt_required()
def upload_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image file selected'}), 400
        
        # Upload to Cloudinary
        result = cloudinary.uploader.upload(
            file,
            folder="thirstee",
            transformation=[
                {'width': 1200, 'height': 800, 'crop': 'limit'},
                {'quality': 'auto:good'}
            ]
        )
        
        return jsonify({
            'url': result['secure_url'],
            'public_id': result['public_id']
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Site Settings Routes
@app.route('/api/settings', methods=['GET'])
def get_settings():
    try:
        settings = SiteSettings.query.all()
        settings_dict = {setting.key: setting.value for setting in settings}
        return jsonify(settings_dict), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/settings', methods=['PUT'])
@jwt_required()
def update_settings():
    try:
        data = request.get_json()
        
        for key, value in data.items():
            setting = SiteSettings.query.filter_by(key=key).first()
            if setting:
                setting.value = str(value) if not isinstance(value, (dict, list)) else str(value)
            else:
                setting = SiteSettings(key=key, value=str(value) if not isinstance(value, (dict, list)) else str(value))
                db.session.add(setting)
        
        db.session.commit()
        
        return jsonify({'message': 'Settings updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Content Management Routes
@app.route('/api/content', methods=['GET'])
def get_content():
    try:
        content = {}
        
        # Get all content settings
        settings = SiteSettings.query.all()
        for setting in settings:
            try:
                # Try to parse JSON values
                import json
                content[setting.key] = json.loads(setting.value)
            except:
                # If not JSON, store as string
                content[setting.key] = setting.value
        
        return jsonify(content), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/content', methods=['PUT'])
@jwt_required()
def update_content():
    try:
        data = request.get_json()
        import json
        
        for key, value in data.items():
            setting = SiteSettings.query.filter_by(key=key).first()
            if setting:
                setting.value = json.dumps(value) if isinstance(value, (dict, list)) else str(value)
            else:
                setting = SiteSettings(key=key, value=json.dumps(value) if isinstance(value, (dict, list)) else str(value))
                db.session.add(setting)
        
        db.session.commit()
        
        return jsonify({'message': 'Content updated successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Dashboard Stats Route
@app.route('/api/dashboard/stats', methods=['GET'])
@jwt_required()
def get_dashboard_stats():
    try:
        stats = {
            'total_products': Product.query.count(),
            'total_gallery_items': GalleryItem.query.count(),
            'pending_requests': JoinRequest.query.filter_by(status='pending').count(),
            'total_sponsors': Sponsor.query.count(),
            'unread_messages': ContactMessage.query.filter_by(status='unread').count(),
            'active_products': Product.query.filter_by(status='active').count()
        }
        
        return jsonify(stats), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Health Check Route
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    }), 200

# Error Handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500

# Initialize database
def init_db():
    """Initialize database with default admin user and content"""
    db.create_all()
    
    # Create default admin if not exists
    admin = Admin.query.filter_by(username='admin').first()
    if not admin:
        admin = Admin(
            username='admin',
            email='admin@thirstee.com'
        )
        admin.set_password('thirstee2024')
        db.session.add(admin)
        db.session.commit()
        print("Default admin user created: admin/thirstee2024")
    
    # Initialize default content if not exists
    import json
    
    # Default hero content
    hero_setting = SiteSettings.query.filter_by(key='hero_content').first()
    if not hero_setting:
        default_hero = {
            "slides": [
                {
                    "title": "Clean Water Crisis",
                    "subtitle": "2.2 billion people lack access to safely managed drinking water",
                    "image": "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                },
                {
                    "title": "Water Pollution Emergency",
                    "subtitle": "80% of wastewater flows back into the ecosystem without treatment",
                    "image": "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                },
                {
                    "title": "Water Scarcity Impact",
                    "subtitle": "By 2025, half of the world's population will live in water-stressed areas",
                    "image": "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                }
            ],
            "mainTitle": "THIRSTEE is Making a Difference",
            "mainDescription": "We provide free custom-labeled water bottles while creating advertising opportunities. Every bottle distributed helps someone in need while promoting your brand."
        }
        hero_setting = SiteSettings(key='hero_content', value=json.dumps(default_hero))
        db.session.add(hero_setting)
    
    # Default about content
    about_setting = SiteSettings.query.filter_by(key='about_content').first()
    if not about_setting:
        default_about = {
            "title": "Quenching Thirst, Creating Impact",
            "description": "THIRSTEE bridges the gap between corporate advertising needs and community welfare. We provide free, custom-labeled water bottles that serve as powerful advertising mediums while addressing the critical need for clean water access.",
            "sponsorCount": "50+",
            "bottlesDistributed": "100K+",
            "citiesReached": "25+",
            "livesImpacted": "10K+"
        }
        about_setting = SiteSettings(key='about_content', value=json.dumps(default_about))
        db.session.add(about_setting)
    
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        init_db()
    
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    app.run(host='0.0.0.0', port=port, debug=debug)