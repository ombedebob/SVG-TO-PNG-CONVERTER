const uploadInput = document.getElementById('upload-svg');
const downloadBtn = document.getElementById('download-png')

uploadInput.addEventListener('change',handleFileUpload);
downloadBtn.addEventListener('click',downloadPNG);

let canvas,context;
let originalFilename = 'converted';


function handleFileUpload(event){
  const file = event.target.files[0];
  if(!file || file.type !== "image/svg+xml"){
    alert("Upload valid .svg file");
    return;
  }
  originalFilename = file.name.split('.').slice(0, -1).join('.') || 'converted';
  
  const reader = new FileReader();
  reader.onload = () => {
    const svgData = reader.result;
    convertSVGToPNG(svgData)
  }
  reader.readAsText(file)
}

function convertSVGToPNG(svgData){
  const img = new Image();
  const svgBlob = new Blob([svgData],{type:'image/svg+xml'});
  const url = URL.createObjectURL(svgBlob);
  
  img.onload = () => {
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d')
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img,0,0);
    URL.revokeObjectURL(url);
    downloadBtn.disabled = false;
  };
  img.src = url;
}

function downloadPNG() {
  if (!canvas) return;
  const pngURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = pngURL;
  link.download =`${originalFilename}.png`
  link.click()
 }
 