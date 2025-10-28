"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// 画面遷移を行うための機能（App Router）の一部？？

import supabase from "../supabase";

function NewEntryPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSave = async ({ title, content }) => {
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("diary_entries")
        .insert([{ title, content }])
        .select();
      // セレクトのところあんまりわかってない

      if (error) {
        console.error("保存エラー", error);
        return { ok: false, error };
      }
      // 保存成功したら一覧へ戻る
      router.push("/diary");
      return { ok: true, data };
    } catch (err) {
      console.error("保存処理中の例外", err);
      return { ok: false, error: err };
    } finally {
      setSaving(false);
    }
  };
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">新規作成</h1>
      <DiaryForm onSave={handleSave} />
      {saving && <p className="text-sm text-gray-500 mt-2">保存処理中...</p>}
    </main>
  );
}
export default NewEntryPage;
