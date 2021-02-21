function fromXLSX(data){
    const workbook = XLSX.read(data, {type: 'array'})
    const results = []
    let caption = ''
    workbook.SheetNames.forEach(name => {
        caption = workbook.Sheets[name]?.A1?.v
        const length = +workbook.Sheets[name]['!ref'].split(':')[1].replace(/\D+/g,"")
        for (let i = 3; i <= length; i++)
        {
            results.push(Result.fromWorksheet(workbook.Sheets[name], i))
        }

    })
    return { caption, results }
}
