var name = 'braitsch';
require('crypto').createHash('md5').update(name).digest("hex");
