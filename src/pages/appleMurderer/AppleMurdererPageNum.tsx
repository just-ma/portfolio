import styled from "styled-components";

const OverflowContainer = styled.div<{ $hidden: boolean }>`
  height: 20px;
  width: ${({ $hidden }) => ($hidden ? 0 : 10)}px;
  overflow: hidden;
  position: relative;
  /* transition: width 0.3s ease-in-out; */
  transition: width 1s steps(5);
`;

const ScrollContainer = styled.div<{ bottom: number }>`
  position: absolute;
  bottom: ${({ bottom }) => bottom}px;
  left: 0;
  display: flex;
  flex-direction: column-reverse;
  overflow-x: hidden;
  overflow-y: auto;
  /* transition: bottom 0.3s ease-in-out; */
  transition: bottom 1s steps(5);
`;

const DigitContainer = styled.div`
  flex-shrink: 0;
  height: 20px;
  width: 10px;
`;

const DIGIT_ARR = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Digit = ({ num, hidden }: { num: number; hidden: boolean }) => {
  return (
    <OverflowContainer $hidden={hidden}>
      <ScrollContainer bottom={(-1 - num) * 20}>
        {DIGIT_ARR.map((digit) => (
          <DigitContainer key={digit}>{digit}</DigitContainer>
        ))}
      </ScrollContainer>
    </OverflowContainer>
  );
};

const PageNumContainer = styled.div`
  display: flex;
  line-height: 20px;
  animation: fadeIn 1s steps(5) forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const PageLabel = styled.div`
  margin-right: 10px;
`;

const AppleMurdererPageNum = ({ pageNum }: { pageNum: number }) => {
  const tensDigit = Math.floor(pageNum / 10);
  const onesDigit = pageNum % 10;

  return (
    <PageNumContainer>
      {pageNum > 0 ? <PageLabel>page:</PageLabel> : null}
      <Digit num={tensDigit} hidden={tensDigit === 0} />
      <Digit num={onesDigit} hidden={pageNum === 0} />
    </PageNumContainer>
  );
};

export default AppleMurdererPageNum;
