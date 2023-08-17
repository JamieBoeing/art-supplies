require('dotenv').config();
require('./database');


const Category = require('../models/category');
const  Item = require('../models/item');

(async function() {

    await Category.deleteMany({});
    const categories = await Category.create([
        { name: 'Paints', sortOrder: 10 },
        { name: 'Brushes', sortOrder: 20 },
        { name: 'Canvas', sortOrder: 30 },
        { name: 'Sketchbooks', sortOrder: 40 },
        { name: 'Markers', sortOrder: 50 },
        { name: 'Easels', sortOrder: 60 },
        { name: 'Accessories', sortOrder: 70 }
    ]);
    
    const artCategories = categories.map(category => category._id);

    await Item.deleteMany({});
    const items = await Item.create([
        { name: 'Acrylic Paint Set', emoji: '🎨', category: artCategories[0], price: 19.95 },
        { name: 'Watercolor Palette', emoji: '🌈', category: artCategories[0], price: 15.95 },
        { name: 'Oil Paint Tubes', emoji: '🖌️', category: artCategories[0], price: 12.95 },
        { name: 'Assorted Brushes Pack', emoji: '🖌️', category: artCategories[1], price: 9.95 },
        { name: 'Fine Liner Set', emoji: '🖋️', category: artCategories[1], price: 7.95 },
        { name: 'Canvas Panel Pack', emoji: '🖼️', category: artCategories[2], price: 14.95 },
        { name: 'Stretched Canvas', emoji: '🖼️', category: artCategories[2], price: 18.95 },
        { name: 'Sketchbook', emoji: '📓', category: artCategories[3], price: 8.95 },
        { name: 'Hardbound Sketch Journal', emoji: '📔', category: artCategories[3], price: 11.95 },
        { name: 'Set of Markers', emoji: '🖍️', category: artCategories[4], price: 16.95 },
        { name: 'Alcohol Markers', emoji: '🎨', category: artCategories[4], price: 22.95 },
        { name: 'Tabletop Easel', emoji: '🎨', category: artCategories[5], price: 29.95 },
        { name: 'Portable Field Easel', emoji: '🎨', category: artCategories[5], price: 34.95 },
        { name: 'Paint Palette', emoji: '🎨', category: artCategories[6], price: 6.95 },
        { name: 'Painting Knife Set', emoji: '🎨', category: artCategories[6], price: 9.95 },
        { name: 'Brush Cleaner', emoji: '🎨', category: artCategories[6], price: 5.95 },
    ]);

    console.log(items)

    process.exit();
})();