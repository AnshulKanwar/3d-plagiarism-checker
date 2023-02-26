import bpy
import math
# import open3d as o3d
import numpy as np
# print(open3d.__version__)
def align_camera(camera, dir):    
    distance = 2
    if dir == "top":
        camera.location = (0, 0, distance)
        camera.rotation_euler = (0, 0, 0)
    elif dir == "bottom":
        camera.location = (0, 0, -distance)
        camera.rotation_euler = (math.radians(180), 0, 0)
    elif dir == "front":
        camera.location = (0, -distance, 0)
        camera.rotation_euler = (math.radians(90), 0, 0)
    elif dir == "back":
        camera.location = (0, distance, 0)
        camera.rotation_euler = (math.radians(-90), math.radians(180), 0)
    elif dir == "right":
        camera.location = (distance, 0, 0)
        camera.rotation_euler = (0, math.radians(90), 0)
    elif dir == "left":
        camera.location = (-distance, 0, 0)
        camera.rotation_euler = (0, math.radians(-90), 0)

def take_snapshot(filename,path):
    bpy.context.scene.render.filepath = f"./{path}/{filename}"
    bpy.ops.render.render(write_still=True)
    
def main(model,path):
    if bpy.data.objects.get('Cube'):
        bpy.data.objects['Cube'].select_set(True)
        bpy.ops.object.delete()
    bpy.ops.object.delete()
    if bpy.data.objects.get('model1'):
        bpy.data.objects['model1'].select_set(True)
        bpy.ops.object.delete()
    if bpy.data.objects.get('model2'):
        bpy.data.objects['model2'].select_set(True)
        bpy.ops.object.delete()

    obj = bpy.ops.import_scene.obj(filepath=model)
    camera = bpy.data.objects['Camera']
    
    for dir in ["top", "bottom", "front", "back", "right", "left"]:
        align_camera(camera, dir)
        take_snapshot(f"{dir}.png",path)

def mainmain():
    main("./uploads/model1.obj","./images_model_1")
    main("./uploads/model2.obj","./images_model_2")

mainmain()
