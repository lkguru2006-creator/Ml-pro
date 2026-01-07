import asyncio
import random

async def stream_chat_response(user_message: str, language: str = "en", voice: str = "female"):
    """
    Simulates a streaming response from an LLM.
    Replace this logic with an actual API call (e.g., OpenAI, Gemini) later.
    """
    
    # Personalities & Localized Responses
    # Support: English, Spanish, French, Hindi, Mandarin, Arabic
    responses = {
        "en": {
            "greeting": ["Hello there! It's great to connect with you.", "Hi! I'm here to help.", "Greetings! How can I brighten your day?"],
            "intro": "I'm Ligma AI, created by LKG and GEM. I can help with knowledge, creativity, or just have a friendly chat.",
            "default": f"That's an interesting point: '{user_message}'. Let's explore that together. I'm capable of detailed reasoning and creative problem solving.",
            "voice_ack": f"I'm speaking in a {voice} voice."
        },
        "es": {
            "greeting": ["¡Hola! Es un placer conectar contigo.", "¡Saludos! Estoy aquí para ayudarte.", "¡Hola! ¿Cómo puedo alegrar tu día?"],
            "intro": "Soy tu asistente de IA. Puedo ayudar con conocimientos, creatividad o simplemente conversar amigablemente.",
            "default": f"Es un punto interesante: '{user_message}'. Explorémoslo juntos. Soy capaz de razonamiento detallado y resolución creativa de problemas.",
            "voice_ack": f"Estoy hablando con voz {voice}."
        },
        "fr": {
            "greeting": ["Bonjour ! Ravi de vous rencontrer.", "Salut ! Je suis là pour vous aider.", "Bonjour ! Comment puis-je égayer votre journée ?"],
            "intro": "Je suis votre assistant IA. Je peux vous aider avec des connaissances, de la créativité ou simplement discuter amicalement.",
            "default": f"C'est un point intéressant : '{user_message}'. Explorons cela ensemble. Je suis capable de raisonnement détaillé et de résolution créative de problèmes.",
            "voice_ack": f"Je parle avec une voix {voice}."
        },
        "hi": {
            "greeting": ["नमस्ते! आपसे जुड़कर बहुत अच्छा लगा।", "नमस्ते! मैं आपकी मदद के लिए यहाँ हूँ।", "प्रणाम! मैं आपका दिन कैसे बेहतर बना सकता हूँ?"],
            "intro": "मैं आपका एआई सहायक हूँ। मैं ज्ञान, रचनात्मकता या बस मैत्रीपूर्ण बातचीत में मदद कर सकता हूँ।",
            "default": f"यह एक दिलचस्प बात है: '{user_message}'। आइए इसे एक साथ देखें। मैं विस्तृत तर्क और रचनात्मक समस्या समाधान में सक्षम हूँ।",
            "voice_ack": f"मैं {voice} आवाज में बोल रहा हूँ।"
        },
        "zh": {
            "greeting": ["你好！很高兴与你联系。", "嗨！我是来帮你的。", "你好！我能为你做些什么？"],
            "intro": "我是你的 AI 助手。我可以帮助你获取知识、激发创意，或者只是友好地聊天。",
            "default": f"这也是个有趣的观点：'{user_message}'。让我们一起探讨一下。我具备详细推理和创造性解决问题的能力。",
            "voice_ack": f"由于技术限制，目前语音模式仅供参考 ({voice})。"
        },
        "ar": {
            "greeting": ["مرحباً! إنه لمن دواعي سروري التواصل معك.", "أهلاً! أنا هنا لمساعدتك.", "مرحباً! كيف يمكنني مساعدتك اليوم؟"],
            "intro": "أنا مساعدك الذكي. يمكنني المساعدة في المعرفة، والإبداع، أو مجرد الدردشة الودية.",
            "default": f"هذه نقطة مثيرة للاهتمام: '{user_message}'. دعنا نستكشف ذلك معاً. أنا قادر على التفكير التفصيلي وحل المشكلات بشكل إبداعي.",
            "voice_ack": f"أنا أتحدث بصوت {voice}."
        },
        "ja": {
            "greeting": ["こんにちは！お会いできて嬉しいです。", "やあ！お手伝いしますよ。", "こんにちは！今日はどのようなお手伝いができますか？"],
            "intro": "私はLigma AI、LKGとGEMによって作成されました。知識、創造性、または単なるフレンドリーなチャットでお手伝いできます。",
            "default": f"それは興味深い点ですね：'{user_message}'。一緒に探求しましょう。私は詳細な推論と創造的な問題解決が可能です。",
            "voice_ack": f"私は{voice}の声で話しています。"
        }
    }

    # Fallback to English if language not supported
    lang_data = responses.get(language, responses["en"])
    
    response_text = ""
    lower_msg = user_message.lower()

    if any(x in lower_msg for x in ["hello", "hi", "hola", "bonjour", "namaste", "nihao", "salam", "konnichiwa"]):
        response_text = f"{random.choice(lang_data['greeting'])} {lang_data['intro']}"
    elif "voice" in lower_msg:
        response_text = lang_data["voice_ack"]
    else:
        response_text = lang_data["default"]

    # Simulate token generation delay for "human-like" feel but FASTER
    tokens = response_text.split(" ")
    for token in tokens:
        yield token + " "
        await asyncio.sleep(0.01 + random.random() * 0.02)  # Much faster: 10ms-30ms delay
