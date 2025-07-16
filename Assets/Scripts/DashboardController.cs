using UnityEngine;
using UnityEngine.Networking;
using TMPro;
using System.Collections;

public class DashboardController : MonoBehaviour
{
    public TMP_Text metricsText;
    public TMP_Text confusionText;
    public TMP_InputField inferenceInput;
    public TMP_Text inferenceOutput;

    void Start()
    {
        StartCoroutine(FetchMetrics());
        StartCoroutine(FetchConfusion());
    }

    public void OnPredictButton()
    {
        StartCoroutine(Predict(inferenceInput.text));
    }

    IEnumerator FetchMetrics()
    {
        using var req = UnityWebRequest.Get(\"http://localhost:8000/metrics\");
        yield return req.SendWebRequest();
        if (req.result == UnityWebRequest.Result.Success)
            metricsText.text = req.downloadHandler.text;
    }

    IEnumerator FetchConfusion()
    {
        using var req = UnityWebRequest.Get(\"http://localhost:8000/confusion\");
        yield return req.SendWebRequest();
        if (req.result == UnityWebRequest.Result.Success)
            confusionText.text = req.downloadHandler.text;
    }

    IEnumerator Predict(string text)
    {
        var payload = JsonUtility.ToJson(new { text });
        using var req = new UnityWebRequest(\"http://localhost:8000/predict\", \"POST\");
        byte[] body = System.Text.Encoding.UTF8.GetBytes(payload);
        req.uploadHandler = new UploadHandlerRaw(body);
        req.downloadHandler = new DownloadHandlerBuffer();
        req.SetRequestHeader(\"Content-Type\", \"application/json\");
        yield return req.SendWebRequest();
        if (req.result == UnityWebRequest.Result.Success)
            inferenceOutput.text = req.downloadHandler.text;
    }
}
