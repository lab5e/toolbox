/**
 * Copy a text string to the user clipboard.
 *
 * @param copyText Text to be copied to the clipboard
 * @returns A promise which follows the success of the copy
 */
export const copyToClipBoard = (copyText: string): Promise<void> => {
  return new Promise((res, rej) => {
    /**
     * The best way of doing it if possible
     */
    if (navigator.clipboard) {
      res(navigator.clipboard.writeText(copyText));
    }

    /**
     * Old school way
     */
    const textArea = document.createElement("textarea");

    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);

    textArea.value = copyText;
    textArea.select();

    let error: unknown;

    try {
      document.execCommand("copy");
    } catch (copyError) {
      error = copyError;
    }

    document.body.removeChild(textArea);

    if (error) {
      rej(error);
    } else {
      res();
    }
  });
};
