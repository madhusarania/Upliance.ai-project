import React, { useEffect, useState, useRef } from "react";
import { Card, CardBody, CardHeader, Tabs, Tab } from "@nextui-org/react";
import "react-quill/dist/quill.snow.css";
import { useAppContext } from "../context/AppContext";
import { useSpring, animated } from "@react-spring/web";
import QuillWrapper from "./QuillWrapper";

const RichTextEditor: React.FC = () => {
  const { richTextContent, setRichTextContent, userData } = useAppContext();
  const [userDataText, setUserDataText] = useState("");
  const quillRef = useRef(null);

  const editorSpring = useSpring({
    to: {
      opacity: 1,
      transform: "translateY(0px)",
    },
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 120, friction: 14 },
  });

  useEffect(() => {
    if (userData.length > 0) {
      const formattedData = userData
        .map(
          (user) =>
            `<h3>User: ${user.name}</h3>
         <p><strong>ID:</strong> ${user.id}</p>
         <p><strong>Email:</strong> ${user.email}</p>
         <p><strong>Address:</strong> ${user.address}</p>
         <p><strong>Phone:</strong> ${user.phone}</p>
         <hr />`
        )
        .join("");

      setUserDataText(formattedData);
    } else {
      setUserDataText("<p>No user data available.</p>");
    }
  }, [userData]);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  return (
    <animated.div style={editorSpring}>
      <Card className="w-full">
        <CardHeader className="flex justify-center pb-0">
          <h2 className="text-2xl font-bold">Rich Text Editors</h2>
        </CardHeader>
        <CardBody>
          <Tabs aria-label="Rich Text Editors">
            <Tab key="editor" title="Editor">
              <div className="mt-4">
                <QuillWrapper
                  ref={quillRef}
                  value={richTextContent}
                  onChange={setRichTextContent}
                  modules={modules}
                  className="h-64"
                />
              </div>
            </Tab>
            <Tab key="userData" title="User Data Viewer">
              <div className="mt-4">
                <QuillWrapper
                  ref={quillRef}
                  value={userDataText}
                  readOnly={true}
                  modules={{ toolbar: false }}
                  className="h-64"
                />
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </animated.div>
  );
};

export default RichTextEditor;
