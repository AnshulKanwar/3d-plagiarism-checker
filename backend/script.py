import bpy
import math

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
    bpy.context.scene.render.filepath = f"/Users/anshulkanwar/Developer/mlsc-makeathon/script/{filename}"
    bpy.ops.render.render(write_still=True)
    
def main():
    bpy.data.objects['Cube'].select_set(True)
    bpy.ops.object.delete()

    obj = bpy.ops.import_scene.obj(filepath="model_normalized.obj")
    camera = bpy.data.objects['Camera']
    
    for dir in ["top", "bottom", "front", "back", "right", "left"]:
        align_camera(camera, dir)
        take_snapshot(f"./output/{dir}.png")

main()
