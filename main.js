const app = new Vue({
    el: '#app',
    data: {
        workbook: [new Result()],
        caption: '',
        sorting: {
            order: 'asc',
            key: null
        },
        charts: {
            barchart: null
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
            }
            reader.readAsArrayBuffer(this.$refs.input.files[0])
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

