"use client";

import { api } from "@/lib/api";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { ArrowLeft, CameraIcon, Cookie } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function EditMemory() {
  const [memory, setMemory] = useState<Memory | null>(null);

  const searchParams = useParams();
  const id = searchParams.id;

  const router = useRouter();

  const token = Cookies.get("token");

  async function loadMemory() {
    const response = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMemory(response.data);
  }

  async function updateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await api.put(
      `/memories/${id}`,
      {
        content: formData.get("content"),
        isPublic: formData.get("isPublic"),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push(`/memories/${id}`);
  }

  useEffect(() => {
    loadMemory();
  }, []);

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="flex w-full items-center justify-between gap-4  ">
        <Link
          href={`/memories/${id}`}
          className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
      </div>
      <div className="space-y-4">
        <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory?.createdAt).format("DD[ de ]MMMM[, ]YYYY")}
        </time>
      </div>

      <form onSubmit={updateMemory} className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-4">
          <label
            htmlFor="media"
            className=" flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <CameraIcon className="h-4 w-4" />
            Anexar mídia
          </label>

          <label
            htmlFor="isPublic"
            defaultChecked={memory?.isPublic}
            className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              defaultChecked={memory?.isPublic}
              value="true"
              className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            />
            Tornar memória pública
          </label>

          <label
            htmlFor="date"
            className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            Data
            <input
              type="date"
              name="date"
              id="date"
              className="keyboard-navigation max-w-[110px] rounded border-gray-400 bg-gray-700 p-1 text-sm"
            />
          </label>
        </div>

        {memory?.coverUrl && (
          <Image
            src={memory?.coverUrl}
            alt=""
            width={592}
            height={280}
            className="aspect-video w-full rounded-lg object-cover"
          />
        )}

        <textarea
          name="content"
          defaultValue={memory?.content}
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />

        <button
          type="submit"
          className="keyboard-navigation inline-block self-end rounded-full bg-green-500 px-5 py-3 font-baijamjuree text-sm uppercase leading-none text-black
         hover:bg-green-600 focus-visible:ring-green-500"
        >
          Atualizar
        </button>
      </form>
    </div>
  );
}
