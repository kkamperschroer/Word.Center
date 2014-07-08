// The possible vowels. No special rules.
var mVowels = 
['A','E','I','O',
{
	U: {
		mustNotBeEnding: true
	}
}];

// The possible vowel pairs.
var mAdvancedVowels =
	[{
		AE: {
			mustNotBeEnding: true
		}
	},
	{
		EI: {
			mustNotBeEnding: true
		}
	},
	{
		IE: {
			mustNotBeEnding: true
		}
	},
	{
		OU: {
			mustNotBeEnding: true
		}
	},
	{
		OA: {
			mustNotBeEnding: true
		}
	},
	{
		UA: {
			mustNotBeEnding: true
		}
	}];

// The possible consonants. Most have no rules.
var mConsonants = 
	['B','C','D','F','G','H','J','K','L','M','N',
	 'P',
	 {
	 	Q: {
	 		mustBeFollowedByU: true,
	 		mustNotBeEnding: true
	 	}
	 },
	 'R','S','T','V','W','X','Y','Z'];

// The advanced consonant combinations
var mAdvancedConsonants = 
    [
     {
    	CK: {
    		mustNotBeStart: true
    	}
     },
     'SH',
     {
     	RT: {
     		mustNotBeStart: true
     	}
     },
     'TH', 
     {
     	BH: {
     		mustNotBeEnding: true
     	}
     },
     {
     	GH: {
     		mustNotBeEnding: true
     	}
     },
     {
     	THR: {
     		mustNotBeEnding: true
     	}
     },
     {
     	TR: {
     		mustNotBeEnding: true
     	}
     },
     {
     	BR: {
     		mustNotBeEnding: true
     	}
     },
     {
     	CL: {
     		mustNotBeEnding: true
     	}
     },
     {
     	BL: {
     		mustNotBeEnding: true
     	}
     },
     {
     	FL: {
     		mustNotBeEnding: true
     	}
     },
     {
     	FR: {
     		mustNotBeEnding: true
     	}
     },
     {
     	CR: {
     		mustNotBeEnding: true
     	}
     },
     {
     	GR: {
     		mustNotBeEnding: true
     	}
     },
     {
     	GL: {
     		mustNotBeEnding: true
     	}
     },
     {
     	KR: {
     		mustNotBeEnding: true
     	}
     },
     {
     	PR: {
     		mustNotBeEnding: true
     	}
     },
     {
     	PL: {
     		mustNotBeEnding: true
     	}
     },
     {
     	SL: {
     		mustNotBeEnding: true
     	}
     },
     {
     	SR: {
     		mustNotBeEnding: true
     	}
     },
     {
     	VR: {
     		mustNotBeEnding: true
     	}
     },
     {
     	WR: {
     		mustNotBeEnding: true
     	}
     },
     'SM',
     {
     	SN: {
     		mustNotBeEnding: true
     	}
     },
     {
     	NG: {
     		mustNotBeStart: true
     	}
     },
     {
     	PP: {
     		mustNotBeStart: true,
     		mustNotBeEnding: true
     	}
     },
     {
     	LL: {
     		mustNotBeStart: true,
     		mustNotBeEnding: true
     	}
     },
     {
     	GG: {
     		mustNotBeStart: true,
     		mustNotBeEnding: true
     	}
     },
     {
     	MM: {
     		mustNotBeStart: true,
     		mustNotBeEnding: true
     	}
     },
     {
     	NN: {
     		mustNotBeStart: true,
     		mustNotBeEnding: true
     	}
     },
     {
     	DD: {
     		mustNotBeStart: true,
     		mustNotBeEnding: true
     	}
     },
     {
     	SS: {
     		mustNotBeStart: true,
     		mustNotBeEnding: true
     	}
     },
     {
     	TT: {
     		mustNotBeStart: true,
     		mustNotBeEnding: true
     	}
     }
    ];
