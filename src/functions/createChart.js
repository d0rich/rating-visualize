function createBarChart(ctx, results = [new Result()]){
    let overall = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const countries = []
    let maxScore = 0
    results.forEach(res => {
        if (res.score > maxScore) maxScore = res.score
    })
    const labels = []
    for (let i = 0; i < 10; i++){
        labels.push(`${i === 0 ? 0:Math.floor(maxScore/10*i+1)} - ${i === 9 ? maxScore: Math.floor(maxScore/10*(i+1))}`)
    }
    results.forEach(res => {
        const scoreIndex = res.score === maxScore? 9 : Math.floor(res.score / maxScore * 10)
        overall[scoreIndex] += 1
        const countryNow = countries.find(c => c.label.toLowerCase() === (res.country?.replace(/\s/, '') || 'Не указано').toLowerCase())
        if (countryNow){
            countryNow.data[scoreIndex] += 1
        }
        else {
            const newCountry = {
                label: res.country?.replace(/\s/, '') || 'Не указано',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderWidth: 1,
                backgroundColor: `rgba(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},0.5)`
            }
            newCountry.data[scoreIndex] += 1
            countries.push(newCountry)
        }
    })
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Всего',
                data: overall,
                borderWidth: 1
            },
                ...countries.sort(sort.byKey('label'))]
        },
        options: {
            title: {
                display: true,
                text: 'Распределение баллов по странам'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });
}
function createDoughnutChart(ctx, results = [new Result()]){
    const data = []
    const labels = []
    const backgroundColor = []
    const ds = [{label: '', number: 0}]
    ds.shift()
    results.forEach(res => {
        const note = ds.find(d => d.label === (res.degree?.toString().replace(" ", '') ? res.degree + " степень": 'Нет диплома'))
        if (note){
            note.number += 1
        }
        else{
            ds.push({label: res.degree?.toString().replace(" ", '') ? res.degree + " степень": 'Нет диплома', number: 1})
        }
    })
    ds.sort(sort.byKey('label'))
    ds.forEach(d => {
        data.push(d.number)
        labels.push(d.label)
        backgroundColor.push(`rgba(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},0.5)`)
    })

    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{data, backgroundColor}],
        },
        options: {
            title: {
                display: true,
                text: 'Соотношение дипломов'
            }
        }
    })
}
