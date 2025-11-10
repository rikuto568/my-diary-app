"use client";

import DiaryForm from "../src/feature/DiaryForm";

export default function NewPage() {
  // ローカル確認用ダミー onSave（Supabase を使わずに動作確認）
  const handleSave = async ({ title, content }: any) => {
    console.log("onSave called:", { title, content });
    return { ok: true, data: { title, content } };
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">新しい日記（表示確認）</h1>
      <DiaryForm onSave={handleSave} />
    </main>
  );
}
