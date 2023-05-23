"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

import { api } from "@/lib/api";

import { Trash2, Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";

dayjs.locale(ptBr);

export default function MemoryDetails() {
  const [memory, setMemory] = useState<Memory | null>(null);

  const router = useRouter();

  const searchParams = useParams();
  const id = searchParams.id;

  const token = Cookies.get("token");

  async function loadMemory() {
    const response = await api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMemory(response.data);
  }

  async function deleteMemory() {
    const deleteResponse = await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (deleteResponse) {
      router.push("/");
    }
  }

  useEffect(() => {
    loadMemory();
  }, []);

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className="space-y-4">
        <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory?.createdAt).format("DD[ de ]MMMM[, ]YYYY")}
        </time>

        <div className="flex w-full items-center justify-between gap-4  ">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`/memories/edit/${memory?.id}`}
              className="cursor-pointer text-gray-200 hover:text-gray-100"
            >
              <Edit className="h-4 w-4 " />
            </Link>

            <Trash2
              onClick={deleteMemory}
              className="h-4 w-4 cursor-pointer text-gray-200 hover:text-gray-100"
            />
          </div>
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

        <p className="text-lg leading-relaxed text-gray-100">
          {memory?.content}
        </p>
      </div>
    </div>
  );
}
