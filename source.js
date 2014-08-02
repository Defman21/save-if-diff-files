//Copyright bla bla bla. Author: Defman.
/*Load components*/
var osPath = Components.classes["@activestate.com/koOsPath;1"].getService(Components.interfaces.koIOsPath);
var os = Components.classes["@activestate.com/koOs;1"].getService(Components.interfaces.koIOs);
var diff = Components.classes["@activestate.com/koDiff;1"].getService(Components.interfaces.koIDiff);
/*Create base vars*/
var basename = ko.views.manager.currentView.koDoc.file.baseName; //current filename
var basefold = ko.views.manager.currentView.koDoc.file.dirName; //current file folder name
var fullpath = osPath.join(basefold, basename); //full path to file
var scimoz = ko.views.manager.currentView.scimoz; //scimoz
var content = scimoz.text; //content of current file
var backup_fld = prompt("Folder name or path: "); //ask for folder when script must place backup
var backup = osPath.join(backup_fld, basename); //create path to backup file

if (!osPath.exists(backup_fld)) {
    os.mkdir(backup_fld); //create folder if not exists
    ko.statusBar.AddMessage('Create folder '+backup_fld, 'editor', 5000, true);
}
if(osPath.exists(backup)) {
    diff.initByDiffingFiles(fullpath, backup);
    if(diff.diff.length > 0) {
        os.writefile(backup, content); //if different between files - write file
        ko.statusBar.AddMessage('Save '+basename+" to "+backup_fld+" with new changes in the file", 'editor', 5000, true);
    } else {
        ko.statusBar.AddMessage("There are no changes between "+fullpath+" and "+backup, 'editor', 5000, true);
    }
} else {
    os.writefile(backup, content);
    ko.statusBar.AddMessage('Save '+basename+" to "+backup_fld, 'editor', 5000, true);
}
