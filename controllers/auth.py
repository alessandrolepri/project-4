# pylint: disable=W0611
from flask import Blueprint, jsonify, request, g
from models.user import UserSchema, User
from models.message import MessageSchema
from lib.secure_route import secure_route

api = Blueprint('auth', __name__)
user_schema = UserSchema()
message_schema = MessageSchema()
users_schema = UserSchema(many=True)


# == REGISTER ===
@api.route('/register', methods=['POST'])
def register():

    user, errors = user_schema.load(request.get_json())

    if errors:
        return jsonify(errors), 422

    user.save()

    return jsonify({'message': 'Registration successful'}), 201

# === LOGIN ===
@api.route('/login', methods=['POST'])
def login():

    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()

    if not user or not user.validate_password(data.get('password', '')):
        return jsonify({'message': 'Unauthorized'}), 401

    return jsonify({
        'message': 'Welcome back {}!'.format(user.username),
        'token': user.generate_token()
    })


# === INDEX USERS ===
@api.route('/users', methods=['GET'])
def index():
    users = User.query.all()
    return users_schema.jsonify(users)

# === SHOW ===
@api.route('/users/<int:user_id>', methods=['GET'])
def users_show(user_id):
    user = User.query.get(user_id)
    return user_schema.jsonify(user)

# === USER MESSAGES ===
@api.route('/users/<int:user_id>/inbox', methods=['POST'])
@secure_route
def send_message(user_id):

    message, errors = message_schema.load(request.get_json())
    message.sender = g.current_user
    message.receiver = User.query.get(user_id)

    if errors:
        return jsonify(errors), 422

    message.save()
    return message_schema.jsonify(message)


# === ME ===
@api.route('/me', methods=['GET'])
@secure_route
def me():

    return user_schema.jsonify(g.current_user)


# == UPDATE THE USER ===
@api.route('/users/<int:user_id>', methods=['PUT'])
# @secure_route
def update(user_id):

    user = User.query.get(user_id)
    user, errors = user_schema.load(request.get_json(), instance=user)


    if errors:
        return jsonify(errors), 422

    user.save()

    return user_schema.jsonify(user)


# === DELETE THE USER ===
@api.route('/users/<int:user_id>', methods=['DELETE'])
# @secure_route
def delete(user_id):

    user = User.query.get(user_id)
    user, errors = user_schema.load(request.get_json(), instance=user)


    if errors:
        return jsonify(errors), 422

    user.remove()

    return '', 204
