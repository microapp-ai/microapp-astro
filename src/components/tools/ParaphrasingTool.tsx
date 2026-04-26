import React, { useState } from 'react';
import type { RelatedTool } from '../../lib/types';

const SYNONYMS: Record<string, string[]> = {
  "good": ["great","excellent","fine","solid","strong"],
  "bad": ["poor","weak","subpar","inferior","lacking"],
  "big": ["large","sizable","substantial","considerable","major"],
  "small": ["tiny","minor","compact","limited","modest"],
  "important": ["crucial","essential","significant","key","critical"],
  "use": ["utilize","employ","apply","leverage","implement"],
  "make": ["create","produce","build","develop","generate"],
  "get": ["obtain","acquire","receive","gain","secure"],
  "show": ["demonstrate","reveal","display","illustrate","present"],
  "help": ["assist","support","aid","facilitate","enable"],
  "need": ["require","demand","necessitate","call for","depend on"],
  "think": ["believe","consider","feel","view","hold"],
  "know": ["understand","recognize","realize","be aware of","grasp"],
  "see": ["observe","notice","view","perceive","spot"],
  "say": ["state","mention","note","indicate","express"],
  "give": ["provide","offer","supply","deliver","present"],
  "find": ["discover","locate","identify","uncover","detect"],
  "start": ["begin","initiate","launch","commence","kick off"],
  "end": ["conclude","finish","complete","close","wrap up"],
  "change": ["alter","modify","adjust","update","revise"],
  "increase": ["grow","expand","rise","boost","enhance"],
  "decrease": ["reduce","lower","cut","shrink","minimize"],
  "improve": ["enhance","upgrade","refine","optimize","strengthen"],
  "create": ["develop","build","produce","generate","establish"],
  "provide": ["offer","supply","deliver","give","furnish"],
  "ensure": ["guarantee","confirm","verify","secure","make sure"],
  "allow": ["permit","enable","let","authorize","facilitate"],
  "include": ["contain","encompass","incorporate","feature","cover"],
  "consider": ["evaluate","assess","examine","review","weigh"],
  "often": ["frequently","regularly","commonly","typically","usually"],
  "quickly": ["rapidly","swiftly","promptly","fast","speedily"],
  "easily": ["simply","readily","effortlessly","smoothly","conveniently"],
  "very": ["extremely","highly","particularly","especially","remarkably"],
  "also": ["additionally","furthermore","moreover","as well","too"],
  "however": ["nevertheless","nonetheless","yet","still","that said"],
  "therefore": ["thus","hence","consequently","as a result","accordingly"],
  "because": ["since","as","given that","due to the fact that","owing to"],
  "although": ["even though","while","despite the fact that","whereas","though"],
};

function paraphrase(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  return sentences.map(sentence => {
    let result = sentence;
    // Replace synonyms
    for (const [word, syns] of Object.entries(SYNONYMS)) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, (match) => {
        const syn = syns[Math.floor(Math.random() * syns.length)];
        // Preserve capitalization
        if (match[0] === match[0].toUpperCase()) {
          return syn.charAt(0).toUpperCase() + syn.slice(1);
        }
        return syn;
      });
    }
    // Occasionally restructure sentence start
    const trimmed = result.trim();
    if (trimmed.length > 30 && Math.random() > 0.6) {
      const parts = trimmed.split(/,\s*/);
      if (parts.length >= 2) {
        result = parts.slice(1).join(', ') + ', ' + parts[0].toLowerCase();
        result = result.charAt(0).toUpperCase() + result.slice(1);
        if (!result.match(/[.!?]$/)) result += '.';
      }
    }
    return result;
  }).join(' ');
}

const ParaphrasingTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [paraphrasedText, setParaphrasedText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleParaphrase = () => {
    if (!inputText.trim()) return;
    setParaphrasedText(paraphrase(inputText));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(paraphrasedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const faqs: FAQItem[] = [
    { question: 'What is a paraphrasing tool?', answer: 'A paraphrasing tool rewrites text using synonyms and restructured sentences while preserving the original meaning.' },
    { question: 'How does this paraphrasing tool work?', answer: 'It replaces words with contextually appropriate synonyms and occasionally restructures sentence order to produce a fresh version of your text.' },
    { question: 'Is my text kept private?', answer: 'Yes. All paraphrasing runs entirely in your browser — no text is ever sent to a server.' },
    { question: 'Can I use this to avoid plagiarism?', answer: 'Paraphrasing helps rephrase content in your own words, but always cite your sources for academic work.' },
    { question: 'What types of text work best?', answer: 'Articles, emails, essays, and reports work best. For optimal results, use clear, well-structured sentences.' },
  ];

  const relatedTools: RelatedTool[] = [
    { title: 'Summarizer', slug: '/summarizer', emoji: '📝' },
    { title: 'Text to Bullet Points', slug: '/text-to-bullet-points', emoji: '📋' },
    { title: 'Sentence Counter', slug: '/sentence-counter', emoji: '🔢' },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 font-sans text-sm"
          rows={8}
          placeholder="Enter text to paraphrase..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          className="px-6 py-3 bg-green-700 text-white font-semibold rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50"
          onClick={handleParaphrase}
          disabled={!inputText.trim()}
        >
          Paraphrase Text
        </button>
        {paraphrasedText && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Paraphrased Result</label>
              <button onClick={handleCopy} className="text-sm text-green-700 hover:text-green-800 font-medium">
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <textarea
              className="w-full p-3 border border-green-200 bg-green-50 rounded-md text-sm font-sans"
              rows={8}
              readOnly
              value={paraphrasedText}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ParaphrasingTool;
