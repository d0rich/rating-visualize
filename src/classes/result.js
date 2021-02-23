class Result{
    constructor(res = {
        fName: '', sName: '', tName: '',
        birthDate: new Date(), class: 0,
        score: 0, degree: 0,
        schoolName: '', country: '',
        region: '', cityType: '', city: '',
        subject: '', university: ''
    }) {
        this.fName = res.fName
        this.sName = res.sName
        this.tName = res.tName
        this.birthDate = new Date(res.birthDate)
        this.class = res.class
        this.score = res.score
        this.degree = res.degree
        this.schoolName = res.schoolName
        this.country = res.country
        this.region = res.region
        this.cityType = res.cityType
        this.city = res.city
        this.subject = res.subject
        this.university = res.university
    }

    static fromWorksheet(worksheet, strNumber){
        const bdCell = worksheet[`E${strNumber}`]
        let birthDate = undefined
        if (bdCell){
            if (bdCell.t === 's') {
                const bd = bdCell.v.split('.')
                birthDate = new Date(bd[2], bd[1] - 1, bd[0])
            }
            else {
                birthDate = new Date((bdCell.v - 25569)*24*60*60*1000)
            }
        }

        return new Result({
            fName: worksheet[`C${strNumber}`]?.v,
            sName: worksheet[`B${strNumber}`]?.v,
            tName: worksheet[`D${strNumber}`]?.v,
            birthDate,
            class: worksheet[`F${strNumber}`]?.v,
            score: worksheet[`G${strNumber}`]?.v,
            degree: worksheet[`H${strNumber}`]?.v,
            schoolName: worksheet[`I${strNumber}`]?.v,
            country: worksheet[`J${strNumber}`]?.v,
            region: worksheet[`K${strNumber}`]?.v,
            cityType: worksheet[`L${strNumber}`]?.v,
            city: worksheet[`M${strNumber}`]?.v,
            subject: worksheet[`N${strNumber}`]?.v,
            university: worksheet[`O${strNumber}`]?.v
        })
    }
}
