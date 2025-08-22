"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Trash2 } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

  interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: {
    id: string;
    title: string;
    content: string;
    created_at: string; // ✅ was Date
    updated_at: string; // ✅ was Date
    is_deleted: boolean;
  };
}
export function NewsModal({ isOpen, onClose, news }: NewsModalProps) {
 

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <DialogTitle className="text-2xl font-bold leading-tight flex-1">
              {news.title}
            </DialogTitle>
            {news.is_deleted && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <Trash2 className="w-3 h-3" />
                Deleted
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Published: {new Date(news.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Updated: {new Date(news.updated_at).toLocaleDateString()}</span>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-6 prose prose-sm max-w-none">{news.content}</div>
      </DialogContent>
    </Dialog>
  );
}
