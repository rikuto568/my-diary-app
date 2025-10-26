"use client";

import { title } from "process";
import { useState } from "react";

function DiaryForm({ onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ページの再読み込みを防ぐメソッド
    if (!content.trim()) {
      alert("内容を入力してください");
      return;
    }
    setSaving(true);
    try {
      // とりあえず一回やってみるみたいな時に使う
      const res = await onSave({ title: title || null, content });
      // onSaveは保存処理をする関数
      if (!res || !res.ok) {
        console.error("保存エラー", res?.error);
        alert("保存に失敗しました。コンソールを確認してください");
        return;
      } else {
        // 保存成功時の処理（必要ならここに）
      }
    } catch (err) {
      console.error("保存処理中の例外", err);
      alert("保存中にエラーが発生しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">今日の出来事</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="タイトル"
        />
      </div>

      <div>
        <label className="block mb-1">中身</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded h-56"
          required
          // 書かないと警告が出るメソッド
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving ? "保存中..." : "保存"}
        </button>
      </div>
    </form>
  );
}

export default DiaryForm;
