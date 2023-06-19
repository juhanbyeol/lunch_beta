//Hobiti 결과값 조회(퍼센트 결과 및 카운트)
const getHobitiPercentage = async  () => {
    return await fetch(`/cmm/selectHobitiPercentage`,{
        method  : "POST",
        headers : {
            "Content-Type": "application/json",
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson;
    })
    .catch((error) => {
        console.log(error);
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    let hobiti = await getHobitiPercentage();
    if(hobiti) {
        if(hobiti.msg === 'Y') {
            let list = hobiti.data;
            for(let i = 0; i < list.length; i++) {
                console.log(list[i].cnText, list[i].typeSum + "개", list[i].percentage);
           }
        }
    }
});
