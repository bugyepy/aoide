async function createAudioData(): Promise<AudioBuffer> {
  // Contextを作成
  const context = new window.AudioContext();

  // 音源を読み込む
  const response = await fetch("/test.wav");

  // バイナリを作成
  const arrayBuffer = await response.arrayBuffer();

  // デコードしてWebAudio APIで扱える音声データに変換
  const audioData = context.decodeAudioData(arrayBuffer);

  // 音声データを返す
  return audioData;
}

export async function createAudio(): Promise<{
  audioSource: AudioBufferSourceNode;
  audioAnalyser: AnalyserNode;
}> {
  // 音声データを作成
  const audioData = await createAudioData();

  // Contextを作成
  const context = new window.AudioContext();

  // 音声ソースを作成
  const audioSource = context.createBufferSource();

  // Analyserを作成
  const audioAnalyser = context.createAnalyser();

  // fftサイズを指定。高いほうがより細かいデータとなる
  audioAnalyser.fftSize = 2048;

  // 音声データを音声ソースに設定
  audioSource.buffer = audioData;

  // ループするように設定
  audioSource.loop = true;

  // 音声データをAnalyserに接続
  audioSource.connect(audioAnalyser);

  // Analyserを音声出力に接続
  audioAnalyser.connect(context.destination);

  return {
    audioSource,
    audioAnalyser,
  };
}
