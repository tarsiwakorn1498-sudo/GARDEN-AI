const URL = "./my_model/";
 
let model;
 
 
// โหลดโมเดล AI
async function loadModel() {
 
	const modelURL = URL + "model.json";
	const metadataURL = URL + "metadata.json";
 
	model = await tmImage.load(
    	modelURL,
    	metadataURL
	);
 
	console.log("GARDEN AI โหลดโมเดลสำเร็จ");
 
}
 
 
// เมื่อเลือกภาพ
document
	.getElementById("imageInput")
	.addEventListener("change", function(event) {
 
    	const file = event.target.files[0];
 
    	if (!file) {
        	return;
    	}
 
    	const image = document.getElementById("preview");
 
    	image.src = URL.createObjectURL(file);
 
    	image.style.display = "block";
 
	});
 
 
// วิเคราะห์ภาพ
async function analyzeImage() {
 
	const imageInput =
        document.getElementById("imageInput");
 
	const result =
        document.getElementById("result");
 
	const loading =
        document.getElementById("loading");
 
 
	// ตรวจสอบว่ามีรูปหรือไม่
	if (imageInput.files.length === 0) {
 
    	result.innerHTML =
        	"<p>⚠️ กรุณาเลือกรูปพรรณไม้ก่อนครับ</p>";
 
    	return;
 
	}
 
 
	// โหลดโมเดลถ้ายังไม่ได้โหลด
	if (!model) {
 
    	loading.innerHTML =
        	"<p>🤖 กำลังเตรียม AI...</p>";
 
    	await loadModel();
 
	}
 
 
	loading.innerHTML =
    	"<p>🔍 AI กำลังวิเคราะห์...</p>";
 
	result.innerHTML = "";
 
 
	const image =
        document.getElementById("preview");
 
 
	// ให้ AI วิเคราะห์ภาพ
	const prediction =
    	await model.predict(image);
 
 
	// หาค่าที่มีความมั่นใจสูงสุด
	let highestPrediction =
    	prediction[0];
 
 
	for (let i = 1; i < prediction.length; i++) {
 
    	if (
        	prediction[i].probability >
        	highestPrediction.probability
    	) {
 
        	highestPrediction =
            	prediction[i];
 
    	}
 
	}
 
 
	const className =
    	highestPrediction.className;
 
	const probability =
    	(
        	highestPrediction.probability * 100
    	).toFixed(2);
 
 
	// แสดงผล
	result.innerHTML = `
 
    	<h3>🌿 ผลการวิเคราะห์</h3>
 
    	<p>
            <strong>${className}</strong>
    	</p>
 
  	  <p>
        	📊 ความมั่นใจ
            <strong>${probability}%</strong>
    	</p>
 
	`;
 
 
	loading.innerHTML = "";
 
}
 
 
// เริ่มโหลดโมเดล
loadModel();
