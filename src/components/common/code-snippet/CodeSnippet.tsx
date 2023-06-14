"use client"

import { Highlight, themes } from "prism-react-renderer"

import clsx from "clsx"

type Props = {
  label?: string | React.ReactNode
  language: string
  code: string
  codeClassNames?: string
}
const CodeSnippet: React.FC<Props> = ({
  label,
  language,
  code,
  codeClassNames,
}) => {
  return (
    <div className="rounded-lg w-full max-w-full bg-code shadow-card-hover-light dark:shadow-card-hover-dark">
      {label && (
        <div className="rounded-t-lg border-b border-b-base-dark bg-base-dark px-6 py-4 w-full">
          <span className="text-labels-small w-full text-subtle-dark">
            {label}
          </span>
        </div>
      )}
      <div
        className={clsx(
          "p-6 w-full sm:max-h-[405px] max-h-[330px] overflow-auto",
          codeClassNames
        )}
      >
        <Highlight
          theme={{
            ...themes.okaidia,
          }}
          code={code}
          language={language}
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={{
                ...style,
                width: "100%",
              }}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className="md:text-code text-code-xsmall"
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

export const DataSnippet: React.FC<{ data: string; language?: string }> = ({
  data,
  language = "javascript",
}) => {
  return (
    <div className="rounded-lg w-fill h-full overflow-auto">
      <div className="overflow-y-auto overflow-x-hidden ">
        <Highlight
          theme={{
            ...themes.okaidia,
            plain: {
              // color: "#7E7D86",
              backgroundColor: "#1C1C1F",
            },
          }}
          code={data}
          language={language}
        >
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={{ ...style, background: "transparent", fontSize: "12px" }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

export default CodeSnippet
