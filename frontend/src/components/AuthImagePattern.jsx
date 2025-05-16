import { Code, Terminal, FileCode, Braces } from "lucide-react"
import { useEffect, useState } from "react"

const CodeBackground = ({ title, subtitle }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const codeSnippets = [
    `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
    `function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) {
      stack.push(s[i]);
    } else {
      const last = stack.pop();
      if (map[last] !== s[i]) return false;
    }
  }
  
  return stack.length === 0;
}`,
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % codeSnippets.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [codeSnippets.length])

  return (
    <div className="hidden lg:block relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-auth-pattern opacity-10"></div>
      <div className="absolute inset-0 flex items-center justify-center ">
        {/* Animated icons */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[10%] left-[15%] animate-pulse">
            <Braces size={40} />
          </div>
          <div className="absolute top-[30%] left-[80%] animate-pulse delay-300">
            <FileCode size={50} />
          </div>
          <div className="absolute top-[70%] left-[20%] animate-pulse delay-700">
            <Terminal size={45} />
          </div>
          <div className="absolute top-[60%] left-[75%] animate-pulse delay-500">
            <Code size={55} />
          </div>
          <div className="absolute top-[85%] left-[45%] animate-pulse delay-200">
            <Braces size={35} />
          </div>
          <div className="absolute top-[15%] left-[60%] animate-pulse delay-100">
            <Terminal size={30} />
          </div>
        </div>

        <div className=" backdrop-blur-md p-12 rounded-3xl shadow-xl  w-full max-w-xl z-10">
          {/* Code editor mockup */}
          <div className="w-full bg-gray-900 rounded-lg shadow-xl mb-8 overflow-hidden">
            <div className="bg-gray-800 px-4 py-2 flex items-center">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs font-mono text-gray-400">problem.js</div>
            </div>

            <div className="p-4 font-mono text-xs sm:text-sm overflow-hidden relative h-64">
              <pre className="whitespace-pre-wrap text-[#4FD1C5] transition-opacity duration-1000">
                {codeSnippets[activeIndex]}
              </pre>
              
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F97316] text-white shadow-lg mb-4">
              <Code className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 mt-2">{subtitle}</p>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default CodeBackground
