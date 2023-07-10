const form=document.querySelector('.container form')

const dayError=document.getElementById('day-error')
const monthError=document.getElementById('month-error')
const yearError=document.getElementById('year-error')

let isValid
const yearSystem=new Date().getFullYear()
const monthSystem=new Date().getMonth()
const daySystem=new Date().getDate()

function setError(field, parent, message){
    isValid=false
    field.textContent=message
    document.querySelector(`.${parent} input`).style.border=`1px solid var(--LightRed)`
    document.querySelector(`.${parent} label`).style.color=`var(--LightRed)`
}
function getDaysOfMonth(m, y){
    return new Date(y,m,0).getDate()
}

function displayResult(y, m ,d){
    document.getElementById('years').textContent=y
    document.getElementById('months').textContent=m
    document.getElementById('days').textContent=d
}

function calculAge(day, month, year){
    let yearAge=0
    let monthAge=0
    let dayAge=0
    
    if(year===yearSystem){
        if(month>monthSystem+1){
            setError(monthError,'month','must be a valid day')
        }else{
            if(day<=daySystem){
                dayAge=daySystem-day
                monthAge=monthSystem+1-month
            }else{
                dayAge=getDaysOfMonth(year,month)-day+daySystem
                monthAge=monthSystem+1-month
            }
        }
    }else if(yearSystem>year){
        if(month>monthSystem+1){
            yearAge=yearSystem-year-1
            monthAge=12-month+monthSystem+1
        }else if(month===monthSystem+1){            
            yearAge=yearSystem-year
            monthAge=0
        }else{
            yearAge=yearSystem-year-1
            monthAge=monthSystem+1-month
        }
        if(day<=daySystem){
            dayAge=daySystem-day
        }else{
            dayAge=getDaysOfMonth(year,month)-day+daySystem
        }
    }
    return [yearAge, monthAge, dayAge]
}

form.onsubmit=function(e){
    e.preventDefault()
    displayResult('--', '--' ,'--')

    const day= this.day.value.trim()
    const month= this.month.value.trim()
    const year= this.year.value.trim()
    isValid=true
    if(!(/[0-9]{1,2}/g).test(day)){
        setError(dayError,'day','this field is required')
    } 
    if(!(/[0-9]{1,2}/g).test(month)){
        setError(monthError,'month','this field is required')
    }
    if(!(/[0-9]{1,2}/g).test(year)){
        setError(yearError,'year','this field is required')
    }
    if(day<=0 || day>31 || day>getDaysOfMonth(month,year) ){
        setError(dayError,'day','must be a valid day')
    }
    if(month<=0 || month>12 ){
        setError(monthError,'month','must be a valid day')
    }
    if(year<=0 || year>yearSystem ){
        setError(yearError,'year','must be a valid day')
    }
    if(isValid){
        const [y, m ,d]=calculAge(+day, +month, +year)
        console.log('result',y,m,d)
        displayResult(y, m ,d)
    }

    window.setTimeout(()=>{
        dayError.textContent=''
        document.querySelector('input').style.border=`1px solid var(--LightGrey)`
        document.querySelector('.day label').style.color=`var(--LightGrey)`

        monthError.textContent=''
        document.querySelector('.month input').style.border=`1px solid var(--LightGrey)`
        document.querySelector('.month label').style.color=`var(--LightGrey)`

        yearError.textContent=''
        document.querySelector('.year input').style.border=`1px solid var(--LightGrey)`
        document.querySelector('.year label').style.color=`var(--LightGrey)`

    },4000)
}



