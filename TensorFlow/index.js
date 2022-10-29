//  イメージをモデルに渡しているところ？
const img = document.querySelector("#img");

// モデルの呼び出し
cocoSsd.load().then(async (model) => {
  // モデルで画像を検出してる所.
  const predictions = await model.detect(img);
  console.log(predictions);

  //  htmlのcanvasの呼び出し
  const c = document.querySelector("#canvas");
  // キャンバスの大きさをイメージの大きさと合わせてる所
  c.width = img.width;
  c.height = img.height;
  // 二次元の描写を宣言？してる所
  const context = c.getContext("2d");
  // キャンバスにイメージを描写させてる
  context.drawImage(img, 0, 0, img.width, img.height);
  // 文字の大きさなど
  context.font = "10px Arial";

  console.log("number of detections: ", predictions.length);

  // ループ処理？キャンバスの機能を使って表示させてるらしい？
  for (const p of predictions) {
    if (p.class === "person") {
      context.beginPath();
      context.rect(...p.bbox);
      context.lineWidth = 1;
      context.strokeStyle = "green";
      context.fillStyle = "green";
      context.stroke();
      context.fillText(
        p.score.toFixed(3) + " " + p.class,
        p.bbox[0],
        p.bbox[1] > 10 ? p.bbox[1] - 5 : 10
      );
    }
  }
});
