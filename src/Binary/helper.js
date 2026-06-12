export const binarySequenceGenerator = () =>{
    let sum = 0
    let sequence = ""
    for (let i = 0; i < 6; i++){
        let number = Math.round(Math.random())
        if (number == 1){
            sum += Math.pow(2, i)
        }
        sequence = number + sequence
    }
    return [sequence, sum]
}