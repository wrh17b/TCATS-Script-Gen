
let scriptContainer=document.getElementById("scriptContainer");

function generateScripts(){
    let countyNbr=document.getElementById("countyNbr").value;

    let scriptHeader=
`delete from utc_error_track
where et_county_nbr=\`${countyNbr}\`
and et_citation in`

    let rawTCATS = String(document.getElementById("rawTCATS").value).split("\n");
    console.log(`${rawTCATS}`);

    for(let i=0; i<rawTCATS.length; i++){
        rawTCATS[i]=`\`${rawTCATS[i]}\``;
    }

    console.log(`${rawTCATS}`);
    let i=0;
    while(i!=rawTCATS.length){
        let firstLineCount=0;
        let firstLine="";
        while(i<rawTCATS.length && firstLineCount<3){
            firstLine+=rawTCATS[i];
            i++;
            if(i!=rawTCATS.length){
                firstLine+=`,`;
            }
            firstLineCount++;
        }

        let elementCount=0;
        let scriptBody="";
        while(i< rawTCATS.length){
            scriptBody+=rawTCATS[i];
            elementCount++;
            i++;

            
            if(elementCount%20==0 || i==rawTCATS.length){
                break;
            }
            if(i!=rawTCATS.length){
                scriptBody+=`,`;
            }
            if(elementCount%4==0){
                scriptBody+=`\n`;
            }

        }

        let newNode = document.createElement("pre");
        newNode.innerHTML=`${scriptHeader}(${firstLine}\n${scriptBody})`;
        scriptContainer.appendChild(newNode);
    }
}