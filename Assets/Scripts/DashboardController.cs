using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.UIElements;
using TMPro;
using System.Collections;
using System.IO;

public class DashboardController : MonoBehaviour
{
    public TMP_Text metricsText;
    public TMP_Text confusionText;
    public TMP_InputField inferenceInput;
    public TMP_Text inferenceOutput;
    public ProgressBar predictProgress;
    public VisualElement metricsChart;
    public VisualElement confusionChart;

    private string baseUrl;

    void Start()
    {
        baseUrl = LoadBackendUrl();
        if (predictProgress != null)
            predictProgress.value = 0f;
        StartCoroutine(FetchMetrics());
        StartCoroutine(FetchConfusion());
    }

    string LoadBackendUrl()
    {
        string defaultUrl = "http://localhost:8000";
        string playerPrefUrl = PlayerPrefs.GetString("backend_url", null);
        if (!string.IsNullOrEmpty(playerPrefUrl))
            return playerPrefUrl;

        string configPath = Path.Combine(Application.streamingAssetsPath, "backend_config.json");
        if (File.Exists(configPath))
        {
            try
            {
                var json = File.ReadAllText(configPath);
                var cfg = JsonUtility.FromJson<BackendConfig>(json);
                if (cfg != null && !string.IsNullOrEmpty(cfg.base_url))
                    return cfg.base_url;
            }
            catch { }
        }
        return defaultUrl;
    }

    [System.Serializable]
    class BackendConfig
    {
        public string base_url;
    }

    [System.Serializable]
    class MetricsResponse
    {
        public int[] epochs;
        public float[] train_loss;
        public float[] val_loss;
    }

    [System.Serializable]
    class ConfusionResponse
    {
        public string[] labels;
        public int[][] matrix;
    }

    [System.Serializable]
    class PredictResponse
    {
        public float[] predictions;
    }

    public void OnPredictButton()
    {
        StartCoroutine(Predict(inferenceInput.text));
    }

    IEnumerator FetchMetrics()
    {
        using var req = UnityWebRequest.Get(baseUrl + "/metrics");
        yield return req.SendWebRequest();
        if (req.result == UnityWebRequest.Result.Success)
        {
            var data = JsonUtility.FromJson<MetricsResponse>(req.downloadHandler.text);
            if (data != null)
            {
                metricsText.text = $"Train: {string.Join(", ", data.train_loss)}\nVal: {string.Join(", ", data.val_loss)}";
            }
        }
        else
        {
            metricsText.text = $"Error: {req.error}";
        }
    }

    IEnumerator FetchConfusion()
    {
        using var req = UnityWebRequest.Get(baseUrl + "/confusion");
        yield return req.SendWebRequest();
        if (req.result == UnityWebRequest.Result.Success)
        {
            var data = JsonUtility.FromJson<ConfusionResponse>(req.downloadHandler.text);
            if (data != null)
            {
                confusionText.text = $"Labels: {string.Join(", ", data.labels)}";
            }
        }
        else
        {
            confusionText.text = $"Error: {req.error}";
        }
    }

    [System.Serializable]
    class PredictRequest
    {
        public string text;
    }

    IEnumerator Predict(string text)
    {
        predictProgress.value = 0f;
        var payload = JsonUtility.ToJson(new PredictRequest { text = text });
        using var req = new UnityWebRequest(baseUrl + "/predict", "POST");
        byte[] body = System.Text.Encoding.UTF8.GetBytes(payload);
        req.uploadHandler = new UploadHandlerRaw(body);
        req.downloadHandler = new DownloadHandlerBuffer();
        req.SetRequestHeader("Content-Type", "application/json");
        yield return req.SendWebRequest();
        predictProgress.value = 100f;
        if (req.result == UnityWebRequest.Result.Success)
        {
            var data = JsonUtility.FromJson<PredictResponse>(req.downloadHandler.text);
            if (data != null)
                inferenceOutput.text = string.Join(", ", data.predictions);
        }
        else
        {
            inferenceOutput.text = "Error: " + req.error;
        }
        predictProgress.value = 0f;
    }
}
