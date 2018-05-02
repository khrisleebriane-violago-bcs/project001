function SearchQueryObject(content) {
    this.content = content;
    // To test Proxy object since string.match returns null if no matches found
    this.includes = content.match(/(?<=\+)\S+/g);
    this.excludes = getExcludes(content);
}

function getIncludes(content) {
    var result = content.match(/(?<=\+)\S+/g);
    if (result == null) {
        result = [];
    }
    return result;
}

function getExcludes(content) {
    var result = content.match(/(?<=-)\S+/g);
    if (result == null) {
        result = [];
    }
    return result;
}

module.exports = SearchQueryObject;