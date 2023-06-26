const Blogs = require('./Categories')
const data = [
    'Прогнозы в IT',
    'Веб-разработка',
    'Мобильная разработка',
    'Фриланс',
    'Алгоритмы',
    'Тестирование IT систем',
    'Разработка игр',
    'Дизайн и юзабилити',
    'Искуственный интелект',
    'Машинное обучение',
]

async function writeDataCategories(){
    const length = await Blogs.count()
    if(length == 0){
        data.map((item, index) => {
            new Blogs({
                name: item,
                key: index
            }).save()
        })
    }
}

module.exports = writeDataCategories