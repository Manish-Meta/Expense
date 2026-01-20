import { ChevronDown, Check, Settings } from "lucide-react";
import { useState } from "react";

export default function AuthAccess() {
  const [minOpen, setMinOpen] = useState(false);
  const [expireOpen, setExpireOpen] = useState(false);
  const [idpOpen, setIdpOpen] = useState(false);

  const [minLength, setMinLength] = useState(8);
  const [expireDays, setExpireDays] = useState(90);
  const [idp, setIdp] = useState("Azure AD");

  const [uppercase, setUppercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);

  const [requireMfa, setRequireMfa] = useState(true);
  const [sms, setSms] = useState(true);
  const [email, setEmail] = useState(true);
  const [app, setApp] = useState(true);
  const [hardware, setHardware] = useState(false);

  const [enableSSO, setEnableSSO] = useState(true);

  const Toggle = ({ enabled, onClick }) => (
    <button
      onClick={onClick}
      className={`w-9 h-5 rounded-full p-[2px] transition ${
        enabled ? "bg-orange-500" : "bg-orange-300"
      }`}
    >
      <div
        className={`w-4 h-4 bg-white rounded-full shadow transition ${
          enabled ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow space-y-6">
      <h3 className="text-sm font-semibold">Authentication & Access</h3>

      <div className="space-y-3">
        <p className="text-xs font-semibold">Password Policy</p>

       
        <div className="flex justify-between items-center text-xs">
          <span>Minimum length</span>
          <div className="relative">
            <button
              onClick={() => setMinOpen(!minOpen)}
              className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-lg"
            >
              {minLength}
              <ChevronDown size={12} />
            </button>

            {minOpen && (
              <div className="absolute right-0 mt-1 bg-white border rounded-xl shadow text-xs w-20">
                {[6, 8, 10, 12].map((v) => (
                  <div
                    key={v}
                    onClick={() => {
                      setMinLength(v);
                      setMinOpen(false);
                    }}
                    className="px-3 py-1.5 flex justify-between hover:bg-orange-50 cursor-pointer"
                  >
                    {v}
                    {v === minLength && <Check size={12} className="text-orange-500" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between text-xs">
          <span>Require uppercase</span>
          <Toggle enabled={uppercase} onClick={() => setUppercase(!uppercase)} />
        </div>

        <div className="flex justify-between text-xs">
          <span>Require numbers</span>
          <Toggle enabled={numbers} onClick={() => setNumbers(!numbers)} />
        </div>

        <div className="flex justify-between text-xs">
          <span>Require symbols</span>
          <Toggle enabled={symbols} onClick={() => setSymbols(!symbols)} />
        </div>

       
        <div className="flex justify-between items-center text-xs">
          <span>Password expiration (days)</span>
          <button
            onClick={() => setExpireOpen(!expireOpen)}
            className="bg-orange-50 px-3 py-1.5 rounded-lg flex gap-1"
          >
            {expireDays}
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

  
      <div className="pt-3 border-t space-y-3">
        <p className="text-xs font-semibold">Multi-Factor Authentication</p>

        <div className="flex justify-between text-xs">
          <span>Require MFA</span>
          <Toggle enabled={requireMfa} onClick={() => setRequireMfa(!requireMfa)} />
        </div>

        {[
          ["SMS Authentication", sms, setSms],
          ["Email Authentication", email, setEmail],
          ["Authenticator App", app, setApp],
          ["Hardware Tokens", hardware, setHardware],
        ].map(([label, val, set]) => (
          <div key={label} className="flex justify-between text-xs pl-3">
            <span>{label}</span>
            <Toggle enabled={val} onClick={() => set(!val)} />
          </div>
        ))}
      </div>


      <div className="pt-3 border-t space-y-3">
        <p className="text-xs font-semibold">Single Sign-On (SSO)</p>

        <div className="flex justify-between text-xs">
          <span>Enable SSO</span>
          <Toggle enabled={enableSSO} onClick={() => setEnableSSO(!enableSSO)} />
        </div>

        <p className="text-[11px] text-orange-600">Identity Provider</p>
        <button
          onClick={() => setIdpOpen(!idpOpen)}
          className="w-full bg-orange-50 px-3 py-2 rounded-lg flex justify-between text-xs"
        >
          {idp}
          <ChevronDown size={12} />
        </button>

        {idpOpen && (
          <div className="border rounded-xl shadow mt-1 text-xs bg-white">
            {["Azure AD", "Google Workspace", "Okta", "Custom SAML"].map((v) => (
              <div
                key={v}
                onClick={() => {
                  setIdp(v);
                  setIdpOpen(false);
                }}
                className="px-3 py-2 hover:bg-orange-50 cursor-pointer flex justify-between"
              >
                {v}
                {v === idp && <Check size={12} className="text-orange-500" />}
              </div>
            ))}
          </div>
        )}

        <button className="flex items-center gap-2 border rounded-xl px-3 py-2 text-xs hover:bg-orange-50">
          <Settings size={14} />
          Configure SSO
        </button>
      </div>
    </div>
  );
}
