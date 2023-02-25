import bpy
import math
import open3d as o3d
import numpy as np

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

def take_snapshot(filename):
    bpy.context.scene.render.filepath = f"./images/{filename}"
    bpy.ops.render.render(write_still=True)
    
def main():
    bpy.data.objects['Cube'].select_set(True)
    bpy.ops.object.delete()

    # obj1 = bpy.ops.import_scene.obj(filepath="model1.obj")
    # mesh = o3d.io.read_triangle_mesh(obj1)
    # vertices = np.asarray(mesh.vertices)
    # centroid = np.mean(vertices, axis=0)
    # vertices -= centroid
    # max_distance = np.max(np.linalg.norm(vertices, axis=1))
    # vertices /= max_distance
    # mesh.vertices = o3d.utility.Vector3dVector(vertices)
    # o3d.io.write_triangle_mesh("model1.obj", mesh)
    camera = bpy.data.objects['Camera']
    
    for dir in ["top", "bottom", "front", "back", "right", "left"]:
        align_camera(camera, dir)
        take_snapshot(f"{dir}.png")

main()