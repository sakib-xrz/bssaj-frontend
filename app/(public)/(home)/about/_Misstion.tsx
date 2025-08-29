import { Card, CardContent } from '@/components/ui/card';
import React from 'react'

function Misstion() {
  return (
    <>
      <Card className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 md:p-8 text-gray-700">
        <CardContent className="p-0 space-y-4 text-justify">
          <h2 className="text-2xl font-bold mb-4">History</h2>
          <p>
            The Bangladeshi Students’ Support Association in Japan (BSSAJ) is a
            non-profit, non-political, and student-focused organization
            established to assist Bangladeshi students studying and aspiring to
            study in Japan. Founded in 2025, BSSAJ is committed to providing
            educational, administrative, and cultural support to ensure a safer
            and more enriching academic journey for students. The association
            actively collaborates with educational institutions, government
            agencies, and cultural bodies in both Bangladesh and Japan to
            promote fairness, guidance, and opportunity. BSSAJ also supports its
            member agencies and institutions by facilitating orientation
            programs, legal aid, and cultural training to bridge the gap between
            students and society in Japan.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-xl mt-4 my-4 shadow-lg border border-gray-200 bg-white p-6 md:p-8 text-gray-700">
        <CardContent className="p-0 space-y-4 text-justify">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p>
            BSSAJ has set out to create a responsible and organized network to
            ensure a safe, transparent, and supportive environment for
            linguistic, administrative, and moral support for Bangladeshi
            students studying and aspiring to study in Japan. BSSAJ makes every
            effort to create quality students by training all teachers and
            students of all members of the organization about Japanese culture
            through special courses.
          </p>
        </CardContent>
      </Card>
    </>
  );
}

export default Misstion

