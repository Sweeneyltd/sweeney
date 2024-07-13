import subprocess

command = [
    'ffmpeg',
    '-re',  # Read input at native frame rate
    '-stream_loop', '-1',  # Loop input indefinitely
    '-i', 'riley.mp4',  # Input file
    '-c:v', 'libx264',  # Video codec
    '-c:a', 'aac',  # Audio codec
    '-strict', 'experimental',  # Experimental AAC audio encoder
    '-f', 'flv',  # Output format FLV for RTMP
    'rtmp://a.rtmp.youtube.com/live2/bxyc-ftz4-hchx-zhkz-dwaq'  # Replace with your actual stream key
]

try:
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print("Streaming to YouTube...")
    stdout, stderr = process.communicate()  # Capture output and errors
    print("Output:", stdout.decode())
    print("Errors:", stderr.decode())
except Exception as e:
    print("Error streaming to YouTube:", e)