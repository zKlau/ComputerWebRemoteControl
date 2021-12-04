from tkinter import *
from tkinter import filedialog

def browseFiles():
    filename = filedialog.askopenfilename(initialdir = "/",
                                          title = "Select a File",
                                          )
    #label_file_explorer.configure(text="File Opened: "+filename)
    path = filename.replace("/","\\")
    path = path.replace(" ","^")
    with open("path.txt", "w") as f:
        f.write(path)

browseFiles()