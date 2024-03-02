// Define the TabModel constructor function
function TabModel(id, url) {
    this.id = id;
    this.url = url;
}

// Method to update the URL for the tab
TabModel.prototype.updateUrl = function(newUrl) {
    this.url = newUrl;
};

// Method to retrieve the URL for the tab
TabModel.prototype.getUrl = function() {
    return this.url;
};
