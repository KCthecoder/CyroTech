// Client settings
this.settings = {
    BASE_URL: "CyroTech",
    DEFAULT_FILE: "SECRET.txt",
    EDITABLE_CONTENT_MAX_SIZE: 65536,
    SAFE_EXT: '.safe',
    VERSION: "2.3",
    DEBUG: false,
    GPG_OPTS: "--cipher-algo AES256"
}

// Compatible with nodejs module
if(typeof(module) !== "undefined") module.exports = this.settings;
