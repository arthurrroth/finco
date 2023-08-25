// import img
import LogoIcon from "../../icon/Logo-icon.png";
import GroupIcon from "../../icon/Group-icon.png";
import ellipse1 from "../../icon/Ellipse-1.png";
import ellipse2 from "../../icon/Ellipse-2.png";

const CardDesign = ({ setDesignColor, setDesignIndex, designIndex }) => {
  const designs = [
    {
      color: "lightseagreen",
    },
    { color: "#7637f5" },
    { color: "lightgray" },
  ];

  const handleSetDesign = (i) => {
    if (i === 0) {
      setDesignColor(designs[0].color);
      setDesignIndex(0);
    } else if (i === 1) {
      setDesignColor(designs[1].color);
      setDesignIndex(1);
    } else {
      setDesignColor(designs[2].color);
      setDesignIndex(2);
    }
  };

  return (
    <>
      <label name="selectDesign-title">Select your card design</label>
      <div className="selectCard-design">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} onClick={() => handleSetDesign(i)}>
            <div
              className={`
                  new-creditcard ${i === 0
                  ? "firstDesign"
                  : i === 1
                    ? "secondDesign"
                    : "thirdDesign"
                } ${i === designIndex && "selectedDesign-effect"}
                `}>
              <img className="new-ellipse1" src={ellipse1} alt="background" />
              <img className="new-ellipse2" src={ellipse2} alt="background" />
              <img className="cc-logo" src={LogoIcon} alt="credit card" />
              <div className="inner-creditcard">
                <p className="creditcardTitle"></p>
                <h5 className="creditcardNumber"></h5>
              </div>
              <div className="bottom-creditcard">
                <img src={GroupIcon} alt="chip" />
                <p>09/25</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CardDesign;
