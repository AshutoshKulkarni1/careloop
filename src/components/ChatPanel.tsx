import React from 'react';
import type { ChatMessage } from '../state/useVoiceFlow';
import type { SupportedLanguage } from '../services/healthService';
import { getTranslation } from '../i18n';
import { MessageSquare, Bot, User, CheckCircle2 } from 'lucide-react';

interface ChatPanelProps {
  messages: ChatMessage[];
  language: SupportedLanguage;
  onConfirmFromChat?: () => void;
  isConfirmationActive?: boolean;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  language,
  onConfirmFromChat,
  isConfirmationActive = false,
}) => {
  const t = getTranslation(language);

  return (
    <div className="bg-white rounded-xl border border-[#E4E2DC] shadow-subtle flex flex-col h-full overflow-hidden">
      {/* Panel Header */}
      <div className="p-4 border-b border-[#E4E2DC] flex items-center justify-between bg-[#FAF9F7]">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#0F5C54]" strokeWidth={1.5} />
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#14211F]">
              {t.chat.title}
            </h3>
            <p className="text-[11px] text-[#5C6966]">{t.chat.subtitle}</p>
          </div>
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white text-[#0F5C54] border border-[#E4E2DC]">
          Live sync
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[380px] text-xs">
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${
                isAssistant ? 'items-start' : 'items-end'
              }`}
            >
              {/* Sender label */}
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-[#5C6966]">
                {isAssistant ? (
                  <>
                    <Bot className="w-3 h-3 text-[#0F5C54]" strokeWidth={1.5} />
                    <span className="font-medium text-[#0F5C54]">CareLoop</span>
                  </>
                ) : (
                  <>
                    <span className="font-medium text-[#14211F]">Patient</span>
                    <User className="w-3 h-3 text-[#14211F]" strokeWidth={1.5} />
                  </>
                )}
                <span>• {msg.timestamp}</span>
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed text-xs ${
                  isAssistant
                    ? 'bg-[#F7F6F3] text-[#14211F] border border-[#E4E2DC]'
                    : 'bg-[#0F5C54] text-white shadow-sm'
                }`}
              >
                <p className="font-normal">{msg.text}</p>

                {msg.subtext && (
                  <p
                    className={`mt-1 text-[11px] ${
                      isAssistant ? 'text-[#5C6966]' : 'text-white/80'
                    }`}
                  >
                    {msg.subtext}
                  </p>
                )}

                {/* If message represents recorded/confirmed card */}
                {msg.type === 'action' && msg.readingData && isConfirmationActive && (
                  <div className="mt-2 pt-2 border-t border-[#E4E2DC] flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-[#0F5C54] tabular-nums">
                      {msg.readingData.type === 'glucose'
                        ? `${msg.readingData.value} mg/dL`
                        : `${msg.readingData.systolic}/${msg.readingData.diastolic} mmHg`}
                    </span>
                    {onConfirmFromChat && (
                      <button
                        type="button"
                        onClick={onConfirmFromChat}
                        className="px-2.5 py-1 rounded bg-[#0F5C54] hover:bg-[#0B4640] text-white text-[11px] font-medium transition-colors"
                      >
                        {t.voice.saveConfirmBtn}
                      </button>
                    )}
                  </div>
                )}

                {msg.type === 'card' && (
                  <div className="mt-1.5 flex items-center gap-1 text-[11px] text-[#0F5C54] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Recorded in chart</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="p-2.5 bg-[#FAF9F7] border-t border-[#E4E2DC] text-center text-[11px] text-[#5C6966]">
        {t.chat.placeholder}
      </div>
    </div>
  );
};
