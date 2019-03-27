from flask import Blueprint, request

test_blueprint = Blueprint('test_blueprint',__name__)

@test_blueprint.route('/test', methods=['GET'])
def test():
	return "test success"
