using UnityEngine;
using UnityEngine.Networking;
using TMPro;
using System.Collections;
using System.IO;

public class DashboardController : MonoBehaviour
{
    public TMP_Text metricsText;
    public TMP_Text confusionText;
    public TMP_InputField inferenceInput;
    public TMP_Text inferenceOutput;

    private string baseUrl;

    void Start()
    {
        baseUrl = LoadBackendUrl();
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

    public void OnPredictButton()
    {
        StartCoroutine(Predict(inferenceInput.text));
    }

    IEnumerator FetchMetrics()
    {
        using var req = UnityWebRequest.Get(baseUrl + "/metrics");
        yield return req.SendWebRequest();
        if (req.result == UnityWebRequest.Result.Success)
            metricsText.text = req.downloadHandler.text;
    }

    IEnumerator FetchConfusion()
    {
        using var req = UnityWebRequest.Get(baseUrl + "/confusion");
        yield return req.SendWebRequest();
        if (req.result == UnityWebRequest.Result.Success)
            confusionText.text = req.downloadHandler.text;
    }

    IEnumerator Predict(string text)
    {
        var payload = JsonUtility.ToJson(new { text });
        using var req = new UnityWebRequest(baseUrl + "/predict", "POST");
        byte[] body = System.Text.Encoding.UTF8.GetBytes(payload);
        req.uploadHandler = new UploadHandlerRaw(body);
        req.downloadHandler = new DownloadHandlerBuffer();
        req.SetRequestHeader("Content-Type", "application/json");
        yield return req.SendWebRequest();
        if (req.result == UnityWebRequest.Result.Success)
            inferenceOutput.text = req.downloadHandler.text;
    }
}
