from flask import (
    Blueprint, request, jsonify,render_template
)
from tasks import ml
import os

bp = Blueprint('placky', __name__, url_prefix='/')

ALLOWED_EXTENSIONS = ("obj", )


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# @bp.route("/test", methods=('GET',))
# def run():
#     result = ml.delay().get()
#     return render_template('index.html', result=result)


@bp.route("/", methods=('POST', ))
def similarity():
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    file = request.files['file1']
    # if allowed_file(file):
    new_file_name="model1.obj"
    file.save('uploads/' + new_file_name)
    file = request.files['file2']
    # if allowed_file(file):  
    new_file_name="model2.obj"
    file.save('uploads/' + new_file_name)
    if 'file1' not in request.files and 'file2' not in request.files:
        return jsonify(error="Obj file not provided")
    # os.system("blender -b -P script.py")
    # result = ml.delay().get()
    return jsonify(similarity=1)
