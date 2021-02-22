const app = new Vue({
    el: '#app',
    data: {
        docs:[
            {title: 'История 20/21 отбор', path: './src/docs/otbor20-21/bally_otborochnogo_etapa_ormo_po_istorii_0.xlsx'},
            {title: 'Литература 20/21 отбор', path: './src/docs/otbor20-21/bally_otborochnogo_etapa_ormo_po_literature_0.xlsx'},
            {title: 'Математика 20/21 отбор', path: './src/docs/otbor20-21/bally_otborochnogo_etapa_ormo_po_matematike_20-21.xlsx'},
            {title: 'Обществознание 20/21 отбор', path: './src/docs/otbor20-21/bally_otborochnogo_etapa_ormo_po_obschestvoznaniyu.xlsx'},
            {title: 'История 20/21 призёры отбора', path: './src/docs/otbor20-21/pobediteli_i_prizery_otborochnogo_etapa_ormo_po_istorii_0.xlsx'},
        ],
        workbook: [new Result()],
        caption: '',
        sorting: {
            order: 'asc',
            key: null
        },
        charts: {
            barchart: null,
            doughnutchart: null
        }
    },
    methods: {
        getDocument(){
            const reader = new FileReader()
            reader.onload = () => {
                const result = fromXLSX(reader.result)
                this.workbook = result.results
                this.caption = result.caption
                this.charts.barchart?.destroy()
                this.charts.barchart = createBarChart(this.$refs.barChart.getContext('2d'), this.workbook)
                this.charts.doughnutchart?.destroy()
                this.charts.doughnutchart = createDoughnutChart(this.$refs.doughnutChart.getContext('2d'), this.workbook)
            }
            reader.readAsArrayBuffer(this.$refs.input.files[0])
        },
        async showDoc(path){
            const reader = new FileReader()
            reader.onload = () => {
                const result = fromXLSX(reader.result)
                this.workbook = result.results
                this.caption = result.caption
                this.charts.barchart?.destroy()
                this.charts.barchart = createBarChart(this.$refs.barChart.getContext('2d'), this.workbook)
                this.charts.doughnutchart?.destroy()
                this.charts.doughnutchart = createDoughnutChart(this.$refs.doughnutChart.getContext('2d'), this.workbook)
            }
            reader.readAsArrayBuffer(await fetch(path).then(r => r.blob()))
        },
        sortBook(key){
            if(this.sorting.key !== key || (this.sorting.key === key && this.sorting.order === 'desc')){
                this.workbook.sort(sort.byKey(key))
                this.sorting.key = key
                this.sorting.order = "asc"
            }
            else if (this.sorting.key === key){
                this.workbook.sort(sort.byKeyDesc(key))
                this.sorting.order = "desc"
            }
        }
    },
    created(){
        this.workbook = []
    }
})

