"use client"

import React, { useState } from "react";
import Layout from "components/Layout/Layout";
import Card from "components/Card/Card";
import {usePlausible} from "next-plausible";
import {useTranslations} from 'next-intl';
import { notFound } from 'next/navigation'

export default function Subscribe() {
  
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
  const plausible = usePlausible();
  const t = useTranslations('All');
  
  const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSubmitting, setShowSubmitting] = useState(false);
  
  if(!config.supportsEmailReminders){
    notFound()
  }
  
  return (
    <Layout showCTABar={true} year={currentYear}>
      <h3 className="text-xl mb-4">{t("subscribe.title")}</h3>
      <Card>
        <p className="pl-px pb-5">{t("subscribe.description")}</p>
        <form
          action="https://f1calendar.us10.list-manage.com/subscribe/post?u=e11245c4d3fecdad90cb66908&amp;id=f7a8a5001f"
          method="post"
          id="subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
          noValidate
          style={{ display: showSuccess ? "none":"block" }}
          onSubmit={async event => {
            event.preventDefault();
            
            var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
      
            if (!emailRegex.test(event.target.EMAIL.value)){
              alert("You have entered an invalid email address!")
              return;
            }
            
            setShowSubmitting(true)
            
            const res = await fetch('/api/email/subscribe', {
              body: JSON.stringify({
              email: event.target.EMAIL.value,
              identifier: localStorage.getItem('uuid'),
              }),
              headers: {
              'Content-Type': 'application/json'
              },
              method: 'POST'
            });
            
            const result = await res.json()
            
            setShowSuccess(true)
            
            plausible("Subscribed to Email Alerts");
          }}
        >
          <div className="row">
            <label htmlFor="mce-EMAIL" className="font-bold text-lg">
              {t("subscribe.label")}
            </label>
            <input
              type="email"
              name="EMAIL"
              className="required px-2 email w-full py-2 text-black bg-gray-100 shadow-inner rounded-md border border-gray-400 focus:outline-none mt-2 mb-4"
              id="mce-EMAIL"
              placeholder="your@email.com"
            />
          </div>
      
          <div className="hidden">
            <input
              type="text"
              name="b_e11245c4d3fecdad90cb66908_f7a8a5001f"
              tabIndex="-1"
              defaultValue=""
            />
          </div>
      
          <input
            type="submit"
            value={t("subscribe.button")}
            name="subscribe"
            id="mc-embedded-subscribe"
            className="btn"
            style={{ display: showSubmitting ? "none":"block" }}
          />
          
          <input
            type="submit"
            value="..."
            disabled="disabled"
            name="subscribe"
            id="mc-embedded-subscribe"
            className="btn"
            style={{ display: showSubmitting ? "block":"none" }}
          />
        </form>
        <p style={{ display: showSuccess ? "block":"none" }}>Success!</p>
      </Card>
    </Layout>
  );
}