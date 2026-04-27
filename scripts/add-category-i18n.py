#!/usr/bin/env python3
"""
Add category label + description translations to all locale common.ts files.
Inserts a `categoryList` block before the closing `} as const;` line.
"""
import os, re

BASE = "/home/ubuntu/microapp-astro/src/i18n/locales"

TRANSLATIONS = {
    "en": {
        "text-tools":          ("Text Tools",          "Word counters, character counters, text formatters, case converters, diff checkers, and more — all free, all instant."),
        "number-calculators":  ("Number Calculators",  "Percentage calculators, unit converters, loan calculators, BMI, GPA, tip calculator, and dozens more math tools."),
        "time-date-tools":     ("Time & Date Tools",   "Age calculators, date difference tools, countdown timers, stopwatch, Pomodoro timer, and more."),
        "generators":          ("Generators",          "Password generators, lorem ipsum, random number generators, coin flip, dice roller, name generators, and more."),
        "dev-tools":           ("Dev Tools",           "JSON formatter, Base64 encoder, QR code reader, regex tester, cURL builder, Markdown to HTML, and more."),
        "writing-ai":          ("Writing & AI",        "AI bio generator, paraphrasing tool, text summarizer, cover letter generator, hashtag generator, and more."),
        "color-design-tools":  ("Colors & Design",     "Color converter, hex to RGB, color palette generator, gradient generator, color name finder, and more."),
    },
    "es": {
        "text-tools":          ("Herramientas de texto",    "Contadores de palabras, caracteres, formateadores de texto, conversores de mayúsculas, comparadores de diferencias y más — todos gratis e instantáneos."),
        "number-calculators":  ("Calculadoras numéricas",   "Calculadoras de porcentaje, conversores de unidades, calculadoras de préstamo, IMC, GPA, propina y docenas de herramientas matemáticas más."),
        "time-date-tools":     ("Herramientas de tiempo",   "Calculadoras de edad, diferencia de fechas, temporizadores de cuenta regresiva, cronómetro, temporizador Pomodoro y más."),
        "generators":          ("Generadores",              "Generadores de contraseñas, lorem ipsum, números aleatorios, lanzamiento de moneda, dado, nombres y más."),
        "dev-tools":           ("Herramientas dev",         "Formateador JSON, codificador Base64, lector de QR, probador de regex, constructor cURL, Markdown a HTML y más."),
        "writing-ai":          ("Escritura e IA",           "Generador de bio con IA, parafraseador, resumidor de texto, generador de carta de presentación, generador de hashtags y más."),
        "color-design-tools":  ("Colores y diseño",         "Conversor de color, hex a RGB, generador de paleta, generador de gradiente, buscador de nombres de color y más."),
    },
    "de": {
        "text-tools":          ("Textwerkzeuge",              "Wortzähler, Zeichenzähler, Textformatierer, Groß-/Kleinschreibungskonverter, Diff-Checker und mehr — alles kostenlos und sofort."),
        "number-calculators":  ("Zahlenrechner",              "Prozentrechner, Einheitenumrechner, Kreditrechner, BMI, GPA, Trinkgeldrechner und Dutzende weiterer Mathe-Tools."),
        "time-date-tools":     ("Zeit- und Datumswerkzeuge",  "Altersrechner, Datumsdifferenz-Tools, Countdown-Timer, Stoppuhr, Pomodoro-Timer und mehr."),
        "generators":          ("Generatoren",                "Passwortgeneratoren, Lorem Ipsum, Zufallszahlengeneratoren, Münzwurf, Würfeln, Namensgeneratoren und mehr."),
        "dev-tools":           ("Entwicklertools",            "JSON-Formatierer, Base64-Encoder, QR-Code-Leser, Regex-Tester, cURL-Builder, Markdown zu HTML und mehr."),
        "writing-ai":          ("Schreiben & KI",             "KI-Bio-Generator, Paraphrasierungstool, Textzusammenfassung, Anschreiben-Generator, Hashtag-Generator und mehr."),
        "color-design-tools":  ("Farben & Design",            "Farbkonverter, Hex zu RGB, Farbpaletten-Generator, Farbverlauf-Generator, Farbname-Finder und mehr."),
    },
    "ru": {
        "text-tools":          ("Текстовые инструменты",       "Счётчики слов, символов, форматировщики текста, конвертеры регистра, инструменты сравнения и многое другое — бесплатно и мгновенно."),
        "number-calculators":  ("Числовые калькуляторы",       "Калькуляторы процентов, конвертеры единиц, кредитные калькуляторы, ИМТ, GPA, чаевые и десятки других математических инструментов."),
        "time-date-tools":     ("Инструменты времени и дат",   "Калькуляторы возраста, разницы дат, таймеры обратного отсчёта, секундомер, таймер Помодоро и многое другое."),
        "generators":          ("Генераторы",                  "Генераторы паролей, Lorem Ipsum, случайных чисел, подбрасывание монеты, бросок кубика, генераторы имён и многое другое."),
        "dev-tools":           ("Инструменты разработчика",    "Форматтер JSON, кодировщик Base64, читатель QR-кодов, тестер regex, конструктор cURL, Markdown в HTML и многое другое."),
        "writing-ai":          ("Написание и ИИ",              "ИИ-генератор биографий, инструмент перефразирования, краткое изложение, генератор сопроводительного письма, генератор хэштегов и многое другое."),
        "color-design-tools":  ("Цвета и дизайн",              "Конвертер цветов, Hex в RGB, генератор палитры, генератор градиента, поиск названия цвета и многое другое."),
    },
    "hi": {
        "text-tools":          ("टेक्स्ट टूल्स",            "शब्द गणना, वर्ण गणना, टेक्स्ट फॉर्मेटर, केस कन्वर्टर, डिफ चेकर और बहुत कुछ — सभी मुफ्त और तुरंत।"),
        "number-calculators":  ("संख्या कैलकुलेटर",         "प्रतिशत कैलकुलेटर, इकाई परिवर्तक, ऋण कैलकुलेटर, BMI, GPA, टिप कैलकुलेटर और दर्जनों और गणित टूल।"),
        "time-date-tools":     ("समय और तारीख टूल्स",       "आयु कैलकुलेटर, तारीख अंतर टूल, काउंटडाउन टाइमर, स्टॉपवॉच, पोमोडोरो टाइमर और बहुत कुछ।"),
        "generators":          ("जनरेटर",                   "पासवर्ड जनरेटर, लोरेम इप्सम, यादृच्छिक संख्या जनरेटर, सिक्का उछालें, पासा फेंकें, नाम जनरेटर और बहुत कुछ।"),
        "dev-tools":           ("डेव टूल्स",                "JSON फॉर्मेटर, Base64 एनकोडर, QR कोड रीडर, रेगेक्स टेस्टर, cURL बिल्डर, Markdown से HTML और बहुत कुछ।"),
        "writing-ai":          ("लेखन और AI",               "AI बायो जनरेटर, पैराफ्रेजिंग टूल, टेक्स्ट सारांश, कवर लेटर जनरेटर, हैशटैग जनरेटर और बहुत कुछ।"),
        "color-design-tools":  ("रंग और डिज़ाइन",           "रंग परिवर्तक, Hex से RGB, रंग पैलेट जनरेटर, ग्रेडिएंट जनरेटर, रंग नाम खोजक और बहुत कुछ।"),
    },
    "ar": {
        "text-tools":          ("أدوات النصوص",                    "عدادات الكلمات والأحرف، منسّقات النصوص، محوّلات الحالة، أدوات مقارنة النصوص والمزيد — كلها مجانية وفورية."),
        "number-calculators":  ("الحاسبات الرقمية",                "حاسبات النسبة المئوية، محوّلات الوحدات، حاسبات القروض، مؤشر كتلة الجسم، المعدل، الإكرامية وعشرات الأدوات الرياضية الأخرى."),
        "time-date-tools":     ("أدوات الوقت والتاريخ",            "حاسبات العمر، أدوات فارق التاريخ، مؤقتات العدّ التنازلي، ساعة إيقاف، مؤقت بومودورو والمزيد."),
        "generators":          ("المولّدات",                        "مولّدات كلمات المرور، Lorem Ipsum، الأرقام العشوائية، رمي العملة، رمي النرد، مولّدات الأسماء والمزيد."),
        "dev-tools":           ("أدوات المطورين",                   "منسّق JSON، مشفّر Base64، قارئ QR، اختبار regex، منشئ cURL، Markdown إلى HTML والمزيد."),
        "writing-ai":          ("الكتابة والذكاء الاصطناعي",       "مولّد السيرة الذاتية بالذكاء الاصطناعي، أداة إعادة الصياغة، ملخّص النصوص، مولّد خطاب التقديم، مولّد الهاشتاق والمزيد."),
        "color-design-tools":  ("الألوان والتصميم",                 "محوّل الألوان، Hex إلى RGB، مولّد لوحة الألوان، مولّد التدرج، باحث اسم اللون والمزيد."),
    },
    "pl": {
        "text-tools":          ("Narzędzia tekstowe",          "Liczniki słów, znaków, formatery tekstu, konwertery wielkości liter, narzędzia porównywania i więcej — wszystko bezpłatne i natychmiastowe."),
        "number-calculators":  ("Kalkulatory liczbowe",        "Kalkulatory procentów, przeliczniki jednostek, kalkulatory kredytów, BMI, GPA, napiwku i dziesiątki innych narzędzi matematycznych."),
        "time-date-tools":     ("Narzędzia czasu i daty",      "Kalkulatory wieku, różnicy dat, liczniki odliczania, stoper, timer Pomodoro i więcej."),
        "generators":          ("Generatory",                  "Generatory haseł, Lorem Ipsum, losowych liczb, rzut monetą, kostką, generatory imion i więcej."),
        "dev-tools":           ("Narzędzia deweloperskie",     "Formater JSON, koder Base64, czytnik QR, tester regex, kreator cURL, Markdown do HTML i więcej."),
        "writing-ai":          ("Pisanie i AI",                "Generator bio AI, narzędzie parafrazy, podsumowanie tekstu, generator listu motywacyjnego, generator hashtagów i więcej."),
        "color-design-tools":  ("Kolory i design",             "Konwerter kolorów, Hex na RGB, generator palety kolorów, generator gradientu, wyszukiwarka nazw kolorów i więcej."),
    },
}

SLUGS = ["text-tools", "number-calculators", "time-date-tools", "generators", "dev-tools", "writing-ai", "color-design-tools"]

def build_block(data):
    lines = ["  categoryList: {"]
    for slug in SLUGS:
        label, desc = data[slug]
        label_esc = label.replace('"', '\\"')
        desc_esc = desc.replace('"', '\\"')
        lines.append(f'    "{slug}": {{')
        lines.append(f'      label: "{label_esc}",')
        lines.append(f'      description: "{desc_esc}",')
        lines.append(f'    }},')
    lines.append("  },")
    return "\n".join(lines)

for locale, data in TRANSLATIONS.items():
    filepath = os.path.join(BASE, locale, "common.ts")
    if not os.path.exists(filepath):
        print(f"SKIP: {filepath} not found")
        continue

    with open(filepath, "r") as f:
        content = f.read()

    if '"text-tools"' in content and 'categoryList' in content:
        print(f"SKIP: {locale} already has categoryList")
        continue

    block = build_block(data)

    # Strategy: insert the block before the line that contains `} as const`
    # The file ends with:
    #   } as const;
    #   export default common;
    # We want to insert before `} as const`
    lines = content.split('\n')
    insert_idx = None
    for i in range(len(lines) - 1, -1, -1):
        stripped = lines[i].strip()
        if stripped.startswith('} as const') or stripped == '};':
            insert_idx = i
            break

    if insert_idx is None:
        print(f"WARN: {locale} — could not find closing brace")
        continue

    block_lines = block.split('\n')
    lines = lines[:insert_idx] + block_lines + lines[insert_idx:]
    new_content = '\n'.join(lines)

    with open(filepath, "w") as f:
        f.write(new_content)
    print(f"OK: {locale} — categoryList block added before line {insert_idx}")

print("Done!")
