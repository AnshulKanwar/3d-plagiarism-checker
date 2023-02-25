from flask import (
    Blueprint, request, jsonify
)

bp = Blueprint('placky', __name__, url_prefix='/')

ALLOWED_EXTENSIONS = ("obj", )


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@bp.route("/", methods=('POST', ))
def similarity():
    if 'file1' not in request.files and 'file2' not in request.files:
        return jsonify(error="Obj file not provided")

    return jsonify(similarity=0.70)
